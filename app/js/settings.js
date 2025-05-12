function loadSettings() {
  ZOHO.CRM.API.getOrgVariable("calendly10__meetingsTasks").then(function (
    data
  ) {
    console.log(data);
    const module = data.Success.Content;
    console.log("Module : " + module);
    let optionsList = document.getElementById("taskMeetingSelect");
    optionsList.value = module;
  });
  ZOHO.CRM.API.getOrgVariable("calendly10__entity").then(function (data) {
    const entity = data.Success.Content;
    console.log(data);
    let optionsList = document.getElementById("leadContactSelect");
    optionsList.value = entity;
  });
}

function changeTaskMeeting() {
  newValue = document.getElementById("taskMeetingSelect").value;
  ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", {
    apiname: "calendly10__meetingsTasks",
    value: newValue,
  }).then(function (data) {
    console.log(data);
  });
}

function changeLeadContact() {
  newValue = document.getElementById("leadContactSelect").value;
  ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", {
    apiname: "calendly10__entity",
    value: newValue,
  }).then(function (data) {
    console.log(data);
  });
}
