define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';
    
    function QrComponent(context) {
        var self = this;
        self.composite = context.element;
   
        context.props.then(function (propertyMap) {
            self.properties = propertyMap;
        });
    };

    // Observables

    self.qr_val = ko.observableArray();  
    self.qr_state = ko.observable("");

    // Lifecycle 
    QrComponent.prototype.activated = function(context){    };

    QrComponent.prototype.attached = function(context){
        // get video from DOM
        let video = document.querySelector('#preview');

        // Instatiate new instance of instascan/scanner
        let scanner = new Instascan.Scanner({video: video });

        // Scan Listener
        scanner.addListener('scan', function (content) {
            self.qr_state("Scanning..")

            self.qr_val.push(content);
    
            if (self.qr_val.length !== -1) {
                self.qr_state("Done.")
            }
        })

        // Get list of Cameras Available
        Instascan.Camera.getCameras().then(function (cameras) {
            console.log(cameras[0])
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
          } else {
            console.error('No cameras found.');
          }
        }).catch(function (e) {
          console.error(e);
        });
    };

    QrComponent.prototype.bindingsApplied = function(context){

        console.log('bindings being applied');
        
    };

    //QrComponent.prototype.detached = function(context){
    //};

    return QrComponent;
});