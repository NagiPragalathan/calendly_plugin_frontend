function loadEventTypes() {
  ZOHO.CRM.CONNECTOR.invokeAPI("calendly10.calendlybk.getuser", {}).then(
    function (data) {
      // response data in json format
      console.log(data);
      data = JSON.parse(data.response);
      console.log(data);
      // getting user uri
      userUri = data.resource.uri;
      console.log(userUri);
      // calling api for event types
      ZOHO.CRM.CONNECTOR.invokeAPI("calendly10.calendlybk.geteventtypes", {
        userUri: userUri,
      }).then(function (data) {
        console.log(data);
        data = JSON.parse(data.response);
        eventTypeArray = data.collection;
        ZOHO.CRM.API.getRecord({
          Entity: entity,
          RecordID: entityId,
        }).then(function (data) {
          contactName = data.data[0].Full_Name;
          contactEmail = data.data[0].Email;
          console.log(contactName, contactEmail);
          // getting the div element
          let eventTypeDiv = document.getElementById("eventTypes");
          if (eventTypeArray.length === 0) {
            eventTypeDiv.innerText =
              "Add some Event Types in Calendly to select here";
            return;
          }
          eventTypeArray.forEach((element) => {
            eventTypeDiv.appendChild(
              createEventTypeCard(
                element.name,
                element.scheduling_url,
                contactName,
                contactEmail
              )
            );
          });
        });
      });
    }
  );
}
function createEventTypeCard(
  eventTypeName,
  eventUrl,
  contactName,
  contactEmail
) {
  // creating a new button
  let card = document.createElement("button");
  // assigning name and value
  card.value = eventTypeName;
  card.name = eventTypeName;
  // class name for styling
  card.className =
    "w-60 px-8 py-4 text-white text-xl font-bold hover:bg-emerald-500 transition duration-300  bg-blue-600 rounded-lg text-center";
  // text content
  card.textContent = eventTypeName;
  // button click event listener
  card.addEventListener("click", function () {
    // hidden the types
    document.getElementById("eventTypes").classList.toggle("hidden");
    // add the Calendly
    createCalendly(eventUrl, contactName, contactEmail);
  });
  return card;
  // let entityId;
}
function createCalendly(url, contactName, contactEmail) {
  console.log("creating app");
  let script = document.createElement("script");
  script.innerHTML = `
  Calendly.initInlineWidget({
    url: "${url}",
    parentElement: document.getElementById("calendlyApp"),
    prefill: {
      name: "${contactName}",
      email: "${contactEmail}",
    },
    utm: {},
  });`;
  document.getElementById("calendlyApp").appendChild(script);
  console.log("app created");
}
