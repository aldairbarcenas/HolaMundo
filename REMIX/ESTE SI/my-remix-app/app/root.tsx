import { json, redirect } from "@remix-run/node"; // Asegúrate de importar redirect
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useEffect } from "react"; // Importa useEffect
import { useNavigation, useSubmit, Form, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react"; // Agrupa las importaciones de @remix-run/react
import appStylesHref from "./app.css?url";
import { getContacts, createEmptyContact } from "./data"; // Asegúrate de que la ruta sea correcta

// Define el tipo de los datos que se cargarán
type LoaderData = {
  contacts: Array<{
    id: string;
    first?: string;
    last?: string;
    favorite?: boolean;
  }>;
  q: string | null; // Agrega 'q' al tipo LoaderData
};

export const links = () => [
  { rel: "stylesheet", href: appStylesHref },
];

// Loader para obtener los contactos, filtrando por parámetros de búsqueda
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q); // Filtra contactos basado en la búsqueda
  return json<LoaderData>({ contacts, q }); // Devuelve 'contacts' y 'q'
};

// Acción para crear un contacto vacío y redirigir a la página de edición
export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`); // Redirige a la página de edición
};

// Componente principal de la aplicación
export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>(); // Usa el tipo definido
  const navigation = useNavigation(); // Obtiene el estado de navegación
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q"); // Determina si se está buscando

  // Sincroniza el valor del campo de búsqueda con los parámetros de búsqueda de la URL
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || ""; // Establece el valor del campo de búsqueda
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form
              id="search-form"
              onChange={(event) => {
                const isFirstSearch = q === null; // Comprueba si es la primera búsqueda
                submit(event.currentTarget, {
                  replace: !isFirstSearch, // Reemplaza en el historial si no es la primera búsqueda
                });
              }}
              role="search"
            >
              <input
                aria-label="Search contacts"
                className={searching ? "loading" : ""}
                defaultValue={q || ""}
                id="q"
                name="q"
                placeholder="Search"
                type="search"
              />
              <div aria-hidden hidden={!searching} id="search-spinner" />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                      to={`contacts/${contact.id}`}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div
          className={navigation.state === "loading" && !searching ? "loading" : ""}
          id="detail"
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
