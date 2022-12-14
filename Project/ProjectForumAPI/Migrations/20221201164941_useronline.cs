using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Articles.Migrations
{
    public partial class useronline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "645d66ce-4906-431e-a270-42988fe11908");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7536c54-7f57-4824-a32e-ac6a445a971c");

            migrationBuilder.AddColumn<int>(
                name: "countUserOnline",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "00b0bc08-f8cc-4417-8937-a7718da40a57", "2c0e4278-635a-4c8d-99e6-98f7556ca25e", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8ee53d81-6062-443e-bcc5-180193ea615e", "8c4e06df-6d7d-495a-b0f5-45ba1b3b9f64", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "00b0bc08-f8cc-4417-8937-a7718da40a57");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ee53d81-6062-443e-bcc5-180193ea615e");

            migrationBuilder.DropColumn(
                name: "countUserOnline",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "645d66ce-4906-431e-a270-42988fe11908", "5793e609-81d4-4b64-a87e-805711e0ee11", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f7536c54-7f57-4824-a32e-ac6a445a971c", "b6d637b5-3657-48b3-a76e-f8e785b71d3b", "Admin", "ADMIN" });
        }
    }
}
