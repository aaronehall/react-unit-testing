using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ToDoItems",
                columns: new[] { "Id", "Description" },
                values: new object[] { 1, "Pick up groceries" });

            migrationBuilder.InsertData(
                table: "ToDoItems",
                columns: new[] { "Id", "Description" },
                values: new object[] { 2, "Go to bank" });

            migrationBuilder.InsertData(
                table: "ToDoItems",
                columns: new[] { "Id", "Description" },
                values: new object[] { 3, "Go to post office" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ToDoItems",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ToDoItems",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ToDoItems",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
