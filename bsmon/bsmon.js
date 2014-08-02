CliEvents = new Meteor.Collection("cli_events");


if (Meteor.isClient) {
    Template.client.events = function () {
        //return "Welcome to bsmon.";
        return CliEvents.find({}, {});
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
        //CliEvents.remove({});
        // code to run on server at startup
        collectionApi = new CollectionAPI({
            apiPath: 'rest',
        });

        collectionApi.addCollection(CliEvents, 'client', {});

        collectionApi.start();
    });
}
