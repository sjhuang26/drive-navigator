define(["gapi"], function(gapi) {
  var r = {};

  r.GoogleDrive = class GoogleDrive {
    constructor(config) {
      this.CLIENT_ID = config.CLIENT_ID;
      this.API_KEY = config.API_KEY;
      this.DISCOVERY_DOCS = config.DISCOVERY_DOCS;
      this.SCOPES = config.SCOPES;
      this.gapi = gapi;
    }

    init() {
      return new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES
          }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.onSignInStatusChange);
    
            // Handle the initial sign-in state.
            this.onSignInStatusChange(gapi.auth2.getAuthInstance().isSignedIn.get());

            resolve();
          });
        });
      });
    }

    onSignInStatusChange(isSignedIn) {
      console.log("isSignedIn =", isSignedIn);
    }

    signIn() {
      gapi.auth2.getAuthInstance().signIn();
    }

    signOut() {
      gapi.auth2.getAuthInstance().signOut();
    }

    test() {
      gapi.client.drive.files.list({
        "q": "'0B5_gTW3cdGKbN2hLU0NwempGZDg' in parents",
        "orderBy": "viewedByMeTime desc",
        "pageSize": 10,
        "fields": "files(id, name)"
      }).then(function(response) {
        console.log("Files found:");
        var files = response.result.files;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file.name + " (" + file.id + ")");
          }
        } else {
          console.log("No files found.");
        }
      });
    }
  }

  return r;
});