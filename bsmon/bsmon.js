ClientEvents = new Meteor.Collection("cli_events");
ServerEvents = new Meteor.Collection("server_events");
ServerStatus = new Meteor.Collection("server_status");

/*
  Sample ClientEvent and ServerEvent object:
  {
    date: '2014-12-11 12:21',
    title: 'Event Title',
    description: 'Some text attached to the event'
  }

  Sample ServerStatus object:
    Note: At any point in time there may be 0 or 1 objects in the
    ServerStatus collection!
  {
    date: '2014-12-11 12:21',  // date of last report
    db: [[1, 0, 0], [1, 0, 1], [1, 1, 1]]
  }

  TODO: a "parsed_db" attribute will be attached to the ServerStatus
    object when sending it to the web UI
*/

if (Meteor.isClient) {
    Template.client.evt_list = function () {
        return ClientEvents.find({}, {sort: {date: -1}});
    };
    Template.server.evt_list = function () {
        return ServerEvents.find({}, {sort: {date: -1}});
    };
    Template.server.status = function () {
        var st =  ServerStatus.findOne({});
        if (typeof st !== 'undefined') {
            // just an example to start working on the UI
            // TODO: implement actual parsed_db
            st.parsed_db = [
                {
                    index: 0,
                    ip: '123.2.2.2'
                },
                {
                    index: 1,
                    ip: '123.2.2.2'
                },
            ];
        }
        return st;
    };

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        //ServerStatus.remove({});
        //ClientEvents.remove({});
        //ServerEvents.remove({});
        // code to run on server at startup
        collectionApi = new CollectionAPI({
            apiPath: 'rest',
        });

        collectionApi.addCollection(ClientEvents, 'client-events', {
            methods: ['POST'], //methods: ['POST','GET','PUT','DELETE'],
        });
        collectionApi.addCollection(ServerEvents, 'server-events', {
            methods: ['POST'],
        });
        collectionApi.addCollection(ServerStatus, 'server-status', {
            methods: ['POST'],
            before: {
                POST: function (obj) {
                    // manage ServerStatus as a 1-object collection
                    ServerStatus.remove({});
                    return true;  // will now perform insertion normally
                }
            }
        });

        collectionApi.start();
    });
}
