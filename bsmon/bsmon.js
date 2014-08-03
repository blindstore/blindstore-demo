ClientEvents = new Meteor.Collection("cli_events");
ServerEvents = new Meteor.Collection("server_events");
ServerStatus = new Meteor.Collection("server_status");

if (Meteor.isClient) {
    Template.client.evt_list = function () {
        return ClientEvents.find({}, {sort: {date: 1}});
    };
    Template.server.evt_list = function () {
        return ServerEvents.find({}, {sort: {date: 1}});
    };
    Template.server.status = function () {
        var st =  ServerStatus.findOne({});
        if (typeof st !== 'undefined') {
            // just an example to start working on the UI
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

    Template.client.events({
        'click input': function () {
            // template data, if any, is available in 'this'
            if (typeof console !== 'undefined')
                console.log("You pressed the button");
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        //ServerStatus.remove({});
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
