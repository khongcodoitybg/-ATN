using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Articles.Migrations
{
    public partial class exit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[] { "1dcc9946-a6be-4517-8271-349e5b2fbb5e", "d3496949-87a0-4810-9e08-653c5386b710", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "93afb9c6-69f1-4cd5-97fe-759cf90b87af", "c35bc65e-33ef-45a7-a460-3ae55171b3d2", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1dcc9946-a6be-4517-8271-349e5b2fbb5e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93afb9c6-69f1-4cd5-97fe-759cf90b87af");

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
    }
}
