using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class v175 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaCreacion",
                table: "Cuestionario",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)");

            migrationBuilder.CreateTable(
                name: "RespuestaCuestionario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreParticipante = table.Column<string>(type: "varchar(100)", nullable: true),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Activo = table.Column<int>(type: "int", nullable: false),
                    CuestionarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestaCuestionario", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RespuestaCuestionario_Cuestionario_CuestionarioId",
                        column: x => x.CuestionarioId,
                        principalTable: "Cuestionario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RespuestaCuestionarioDetalle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaCuestionarioId = table.Column<int>(type: "int", nullable: false),
                    RespuestaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestaCuestionarioDetalle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RespuestaCuestionarioDetalle_RespuestaCuestionario_RespuestaCuestionarioId",
                        column: x => x.RespuestaCuestionarioId,
                        principalTable: "RespuestaCuestionario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RespuestaCuestionarioDetalle_Respuesta_RespuestaId",
                        column: x => x.RespuestaId,
                        principalTable: "Respuesta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RespuestaCuestionario_CuestionarioId",
                table: "RespuestaCuestionario",
                column: "CuestionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestaCuestionarioDetalle_RespuestaCuestionarioId",
                table: "RespuestaCuestionarioDetalle",
                column: "RespuestaCuestionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestaCuestionarioDetalle_RespuestaId",
                table: "RespuestaCuestionarioDetalle",
                column: "RespuestaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RespuestaCuestionarioDetalle");

            migrationBuilder.DropTable(
                name: "RespuestaCuestionario");

            migrationBuilder.AlterColumn<string>(
                name: "FechaCreacion",
                table: "Cuestionario",
                type: "varchar(100)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
