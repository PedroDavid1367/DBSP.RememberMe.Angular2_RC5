export class ContactsData {
  createDb() {
    let contacts = [
      {
        "Id": 1,
        "OwnerId": null,
        "Name": "Ariel",
        "Email": "ariel@hotmail.com",
        "Phone": "4431300",
        "Organization": "Home",
        "Misc": "2nd"
      },
      {
        "Id": 2,
        "OwnerId": null,
        "Name": "Rodrigo",
        "Email": "rodrigo@hotmail.com",
        "Phone": "4431300",
        "Organization": "Home",
        "Misc": "3rd"
      },
      {
        "Id": 3,
        "OwnerId": null,
        "Name": "Erwin",
        "Email": "erwin@hotmail.com",
        "Phone": "4431300",
        "Organization": "Home",
        "Misc": "4th"
      }
    ];
    return { contacts };
  }
}
