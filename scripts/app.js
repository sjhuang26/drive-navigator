requirejs.config({
  shim: {
    "bootstrap": {
      deps: ["jquery", "popper-loader"]
    },
    "gapi": {
      exports: "gapi"
    },
    "storejs": {
      exports: "store"
    },
    "underscorejs": {
      exports: "_"
    },
    "vue": {
      exports: "Vue"
    },
    "popperjs": {
      deps: ["jquery"],
      init: function(p) {
        window.Popper = p;
      }
    }
  },
  paths: {
    "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min",
    "gapi": "https://apis.google.com/js/api",
    "google-drive": "lib/google-drive-util/google-drive",
    "jquery": "https://code.jquery.com/jquery-3.2.1.min",
    "popperjs": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min",
    "popper-loader": "lib/popper-loader",
    "storejs": "https://cdn.rawgit.com/marcuswestin/store.js/2b486f1f/dist/store.modern.min",
    "underscorejs": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
    "vue": "https://vuejs.org/js/vue",
  }
});

requirejs(["jquery", "vue", "underscorejs", "google-drive", "bootstrap"], function($, Vue, _, drive) {
  $(() => {
    var driveInstance = new drive.GoogleDrive({
      CLIENT_ID: '234321269537-fhsu1deau3cu4j3bjuqm2scn992tu30l.apps.googleusercontent.com',
      API_KEY: 'AIzaSyCRk56putTEtlFVOQDGHXu6hFcz902kI9o',
      DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      SCOPES: 'https://www.googleapis.com/auth/drive.metadata.readonly'
    });
    
    driveInstance.init().then(() => {
      driveInstance.test();
    });
  });
});