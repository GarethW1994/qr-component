/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';
    
    function QrComponent(context) {
        var self = this;
        self.composite = context.element;
   
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here 

        });
    };

    self.qr_val = ko.observableArray();  
    self.qr_state = ko.observable("");

    //Lifecycle methods - uncomment and implement if necessary 
    QrComponent.prototype.activated = function(context){
       console.log('activated')
    };

    QrComponent.prototype.attached = function(context){
        console.log('attached')
        let video = document.querySelector('#preview');

        let scanner = new Instascan.Scanner({video: video });

        scanner.addListener('scan', function (content) {
            self.qr_state("Scanning..")
            self.qr_val.push(content);
    
            if (self.qr_val.length !== -1) {
                self.qr_state("Done.")
            }
        })
        
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