import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
  } from "@remix-run/node";
  import { json } from "@remix-run/node";
  import { Form, useLoaderData, useFetcher } from "@remix-run/react"; // Asegúrate de importar useFetcher
  import type { FunctionComponent } from "react";
  import { getContact, updateContact } from "../data"; // Asegúrate de que la ruta sea correcta
  import type { ContactRecord } from "../data";
  import invariant from "tiny-invariant";
  
  // Define el tipo de los datos del contacto
  type LoaderData = {
    contact: ContactRecord;
  };
  
  // Loader para obtener el contacto
  export const loader = async ({
    params,
  }: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const contact = await getContact(params.contactId);
    
    // Manejo de error si el contacto no existe
    if (!contact) {
      throw new Response("Not Found", { status: 404 });
    }
  
    return json<LoaderData>({ contact });
  };
  
  // Acción para actualizar el estado de favoritos
  export const action = async ({
    params,
    request,
  }: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    await updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
    return null; // O puedes devolver una respuesta JSON si necesitas
  };
  
  export default function Contact() {
    const { contact } = useLoaderData<LoaderData>();
  
    return (
      <div id="contact">
        <div>
          <img
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        </div>
  
        <div>
          <h1>
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
            <Favorite contact={contact} />
          </h1>
  
          {contact.twitter ? (
            <p>
              <a href={`https://twitter.com/${contact.twitter}`}>
                {contact.twitter}
              </a>
            </p>
          ) : null}
  
          {contact.notes ? <p>{contact.notes}</p> : null}
  
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
  
            {/* Botón de eliminación */}
            <Form
              action="destroy"
              method="post"
              onSubmit={(event) => {
                const response = confirm(
                  "Please confirm you want to delete this record."
                );
                if (!response) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  
  const Favorite: FunctionComponent<{
    contact: Pick<ContactRecord, "favorite">;
  }> = ({ contact }) => {
    const fetcher = useFetcher();
    const favorite = fetcher.formData
      ? fetcher.formData.get("favorite") === "true"
      : contact.favorite;
  
    return (
      <fetcher.Form method="post">
        <button
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          name="favorite"
          value={favorite ? "false" : "true"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    );
  };
  