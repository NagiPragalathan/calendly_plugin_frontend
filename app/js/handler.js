var zCrmIds;
var zCrmModule;
var paramUrl;

function sanitize(word) {
  var sanitizedValue = word.replace(/[^A-Za-z0-9 ]/g, "");
  return sanitizedValue;
}

function loadPage() {
  ZOHO.CRM.API.getOrgVariable("calendly10__apikey").then(function (data) {
    if (data && data.Success) {
      apiKey = data.Success.Content;

      if (apiKey != "") {
        $.each(zCrmIds, function (index, value) {
          if (value) {
            ZOHO.CRM.API.getRecord({
              Entity: zCrmModule,
              RecordID: value,
            }).then(function (response) {
              $.each(response.data, function (key, rvalue) {
                f_name = sanitize(rvalue.First_Name);
                l_name = sanitize(rvalue.Last_Name);
                if (f_name) {
                  paramUrl = "?&name=" + f_name + l_name;
                } else {
                  paramUrl = "?&name=" + l_name;
                }
                email = rvalue.Email;
                if (email) {
                  paramUrl = paramUrl + "&email=" + email;
                } else {
                  paramUrl = paramUrl + "&email=" + "noemail";
                }
                console.log(paramUrl);
              });
            });
          }
        });

        console.log(apiKey);
        var URL = "https://calendly.com/api/v1/users/me/event_types";
        request = {
          url: URL,
          headers: {
            "X-TOKEN": apiKey,
          },
        };
        ZOHO.CRM.HTTP.get(request).then(function (data) {
          console.log(data);
          eventTypes = $.parseJSON(data);
          //console.log(eventTypes);
          $.each(eventTypes.data, function (key, value) {
            console.log(value.attributes);
            $("#error").append(
              '<a href="' +
                value.attributes.url +
                paramUrl +
                '" style="background-color:' +
                value.attributes.color +
                '">' +
                value.attributes.name +
                " (Duration :" +
                value.attributes.duration +
                ")</a></br></br>"
            );
          });
        });
      }
    } else {
      console.log("else");
      $("#error").append(
        "Please authorize Zoho CRM to access Calendly under Market Place -> Calendly"
      );
    }
  });
}

function getFieldValueData(obj) {
  zCrmIds = obj.EntityId;
  zCrmModule = obj.Entity;
}

const Const = {
  orgVariable: {
    apiKey: "calendly10__apikey",
    module: "calendly10__module",
    activities: "calendly10__activity",
    salessignals: "calendly10__salessignals",
    zKey: "calendly10__zapikey",
  },
};

Utils = {};
/*
 * util methods
 */
Utils.showLoading = function () {
  $("#loadingDiv").show();
};
Utils.hideLoading = function () {
  $("#loadingDiv").hide();
};
Utils.successMsg = function (message) {
  $(".successMsg").text(message);
  $(".successMsg").slideDown(function () {
    $(".successMsg").delay(3000).slideUp();
  });
};

function loadSettings() {
  ZOHO.CRM.API.getOrgVariable(Const.orgVariable.apiKey).then(function (data) {
    if (data && data.Success) {
      apiKey = data.Success.Content;
      $("#apikey").val(apiKey);
    }
  });

  ZOHO.CRM.API.getOrgVariable(Const.orgVariable.module).then(function (data) {
    if (data && data.Success) {
      moduleName = data.Success.Content;
      $("#modules").val(moduleName);
    }
  });

  ZOHO.CRM.API.getOrgVariable(Const.orgVariable.activities).then(function (
    data
  ) {
    if (data && data.Success) {
      activities = data.Success.Content;
      $("#activities").val(activities);
    }
  });
  ZOHO.CRM.API.getOrgVariable(Const.orgVariable.salessignals).then(function (
    data
  ) {
    if (data && data.Success) {
      salessignals = data.Success.Content;
      if (salessignals == "true") {
        $("#salessignals").prop("checked", true);
      }
      if (salessignals == "false") {
        $("#salessignals").prop("checked", false);
      }
    }
  });
  ZOHO.CRM.API.getOrgVariable(Const.orgVariable.privatecalendar).then(function (
    data
  ) {
    if (data && data.Success) {
      privatecalendar = data.Success.Content;
      if (privatecalendar == "true") {
        $("#privatecalendar").prop("checked", true);
      }
      if (privatecalendar == "false") {
        $("#privatecalendar").prop("checked", false);
      }
    }
  });
  ZOHO.CRM.API.getOrgVariable(Const.orgVariable.timeformat).then(function (
    data
  ) {
    if (data && data.Success) {
      timeformat = data.Success.Content;
      if (timeformat == "true") {
        $("#timeformat").prop("checked", true);
      }
      if (timeformat == "false") {
        $("#timeformat").prop("checked", false);
      }
    }
  });
}

function salessignal() {
  if ($("#salessignals").is(":checked")) {
    overwriteValue = true;
  } else {
    overwriteValue = false;
  }

  var salesSignal = {
    apiname: Const.orgVariable.salessignals,
    value: overwriteValue,
  };
  ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", salesSignal).then(function (data) {
    console.log(data);
  });
}

function updateAPIKey() {
  var apiKeyVal = $("#apikey").val();
  var apiKeyMap = {
    apiname: Const.orgVariable.apiKey,
    value: apiKeyVal,
  };
  ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", apiKeyMap).then(function (data) {
    console.log(data);
  });
}

function clientModule() {
  var SModule = $("#modules option:selected").text();
  var moduleMap = {
    apiname: Const.orgVariable.module,
    value: SModule,
  };
  ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", moduleMap).then(function (data) {
    console.log(data);
  });
}

function appointModule() {
  var SActivity = $("#activities option:selected").text();
  var activityVariable = {
    apiname: Const.orgVariable.activities,
    value: SActivity,
  };
  ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", activityVariable).then(function (
    data
  ) {
    console.log(data);
  });
}

function fixIssues() {
  var url;
  var zKey;
  ZOHO.CRM.API.getOrgVariable(Const.orgVariable.zKey).then(function (data) {
    if (data && data.Success) {
      zKey = data.Success.Content;
      console.log(zKey);
      url =
        "https://platform.zoho.com/crm/v2/functions/calendly10__fixsync/actions/execute?auth_type=apikey&zapikey=" +
        zKey;
      request = {
        url: url,
      };
      ZOHO.CRM.HTTP.get(request).then(function (data) {
        console.log(data);
        Response = $.parseJSON(data);
        alert(Response.details.output);
      });
    }
  });
}
