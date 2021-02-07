/**
* Example Plugin - Show how you can use the plugin engine
* NOTE: Do NOT set global values outside of the plugin object
*    Maybe they will conflict with other addons or any in-page related variables
*    Only use the plugin cache/storage to set/get variables
*
* @author Nefomemes
* @version 0.1.0
* @url https://getbblog.com
*/

// initialize your plugin
BBLog.handle("add.plugin", {

    /**
    * The unique, lowercase id of my plugin
    * Allowed chars: 0-9, a-z, -
    */
    id : "betterlog-bf4",

    /**
    * The name of my plugin, used to show config values in bblog options
    * Could also be translated with the translation key "plugin.name" (optional)
    *
    * @type String
    */
    name : "BetterlogBF4",

    /**
    * Some translations for this plugins
    * For every config flag must exist a corresponding EN translation
    *   otherwise the plugin will no be loaded
    *
    * @type Object
    */
    translations : {
        "en" : {
            "options.enableBF4bg": "Use BF4 background image",
            "options.prod": "Use production release for secondary files",
           "options.logEverything":"Log everything to the Chrome Devtools"
        },
	"id": {
		"options.enableBF4bg": "Pakai gambar latar belakang BF4",
		"options.prod":"Pakai keluaran Production untuk file sekunder",
		"options.logEverything":"Log semua hal yang terjadi ke Chrome Devtools"
	}
    },

    /**
    * Configuration Options that appears in the BBLog Menu
    * Every option must be an object with properties as shown bellow
    * Properties available:
    *   key : The name for your config flag - The user can toggle this option
    *         and you can retreive the users choice with instance instance.storage(YOUR_KEY_NAME) (0 or 1 will be returned)
    *   init : Can be 0 or 1 - Represent the initial status of the option when the user load the plugin for the first time
    *          If you want that this option is enabled on first load (opt-out) than set it to 1, otherwise to 0 (opt-in)
    *   handler(optional): When set as a function this config entry turns into a button (like the plugins button you see in the bblog menu)
    *                       The function well be executed when the user clicks the button
    */
    configFlags : [
        {"key" : "options.enableBF4bg", "init" : 1},
	{"key" : "options.prod", 
	"init": 1},
	{
	"key":"options.prod",
	"init": 0
	}
     
    ],

    /**
    * A handler that be fired immediately (only once) after the plugin is loaded into bblog
    *
    * @param object instance The instance of your plugin which is the whole plugin object
    *    Always use "instance" to access any plugin related function, not use "this" because it's not working properly
    *    For example: If you add a new function to your addon, always pass the "instance" object
    */
    init : function(instance){

	    if(document.location.startsWith("http://")){
		    document.location = `https://${document.location.slice('http://'.length - 1)}`;
	    }
      console.log(instance);

      var game = document.location.slice("https://battlelog.battlefield.com/".length - 1).split("/")[0];



	if(game !== "bf4"){
        instance.addFile(instance, "bf4-bf3-theme.css");
	instance.addFile(instance, "bf4-bf3-nefomemes.css");
    } else {
	instance.addFile(instance, "bf4-theme.css");
    }

if(instance.storage("options.enableBF4bg") && game !== "bf4"){
	instance.addFile(instance, "bf3-bg.css");
}




    },

    /**
    * A trigger that fires everytime when the dom is changing but at max only once each 200ms (5x per second) to prevent too much calls in a short time
    * Example Case: If 10 DOM changes happen in a period of 100ms than this function will only been called 200ms after the last of this 10 DOM changes
    * This make sure that all actions in battlelog been finished before this function been called
    * This is how BBLog track Battlelog for any change, like url, content or anything
    *
    * @param object instance The instance of your plugin which is the whole plugin object
    *    Always use "instance" to access any plugin related function, not use "this" because it's not working properly
    *    For example: If you add a new function to your addon, always pass the "instance" object
    */
    domchange : function(instance){
        
    },

    /**
    * This could be a function that you've implemented, it's up to you and your plugin
    * Notice the "instance" parameter, you should always pass the instance to any own function
    * See in the "my.btn.option" config flag click handler where this function is called for example
    *
    * @param object instance The instance of your plugin which is the whole plugin object
    *    Always use "instance" to access any plugin related function, not use "this" because it's not working properly
    *    For example: If you add a new function to your addon, always pass the "instance" object
    */
    getCdnUrl : function(instance, file){
        	if(instance.storage("options.prod")){
			let fileName = file.split(".");
			let ext = fileName.pop();
			fileName = fileName.join("");

			let min = "";
			if(['js', 'css'].includes(ext)){
				min = '.min';
			};
			return `https://cdn.jsdelivr.net/npm/betterlog-bf4/${fileName}${min}.${ext}`;
		} else {
			return `https://betterlog-bf4.nefomemes.repl.co/${file}`;


		}
    },
	addFile: function addFile(instance, fileName){
		const cdnUrl = instance.getCdnUrl(instance, fileName);

		if(cdnUrl.endsWith(".js")){
let script = document.createElement('script');


	script.setAttribute("src", cdnUrl);


	
  	document.head.appendChild(script);
		} else if(cdnUrl.endsWith(".css")){
 	let css = document.createElement('link');

	css.setAttribute("rel", "stylesheet");
	css.setAttribute("href", cdnUrl);


	
  	document.head.appendChild(css);
		} else {
			throw Error("Not a valid file!");
		}
	},

	log: (instance, message){
		if(instance.storage("options.logEverything")){
		console.log(message);
		}
	}



    /**
    * This function will be setted (injected) by the initializer
    * This placeholder must not be implemented in your plugin,
    *    it's added for tutorial purposes only in this example to show you how the function will look like
    * Get the translation for your plugin, depends on the current user language
    *
    * @param string key
    */

    /**
    * This function will be setted (injected) by the initializer
    * This placeholder must not be implemented in your plugin,
    *    it's added for tutorial purposes only in this example to show you how the function will look like
    * Get/Set values in the plugin cache, cache means a temporarily cache which will be flushed after a complete page reload (not a ajax reload)
    * You don't need to add a prefix/namespace to the key, it's already namespaced and sandboxed to your plugin
    *
    * @param string key
    * @param mixed value Optional, if not set the function return the value instead of setting it
    */
   

    /**
    * This function will be setted (injected) by the initializer
    * This placeholder must not be implemented in your plugin,
    *    it's added for tutorial purposes only in this example to show you how the function will look like
    * Get/Set values in the permanent storage, this data will be stored forever
    * Please use this not as much because users browser storage is limited
    * You don't need to add a prefix/namespace to the key, it's already namespaced and sandboxed to your plugin
    * Also the config flag setting will be stored here, in our example "foo.bar", "my.option" and "my.btn.option" as integer values
    *
    * @param string key
    * @param mixed value Optional, if not set the function return the value instead of setting it
    */
   
});