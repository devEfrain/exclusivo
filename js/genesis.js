/*---------------------------------------------------------------------------------------------------------------------
* LEGAL NOTICE 			   	: This library or document was created for the Acces and Control to web pages.
* AUTHOR					: Hugo Efrain Euan Catzin
* DATE		  			   	: 20 JANUARY 2014
* LAST VERSION DATE		   	: 19 MAY 2018
* JAVA SCRIPT DOCUMENT NAME : genesis.js
* BUILD				   	   	: v 1.2.1
* NOTES					   	: LAST VERSION DON'T REQUIRED JQUERY LIBRARY
						   	  ORIGINAL SOURCE
							 
							   			"Efrain | Yearning For Perfection"
----------------------------------------------------------------------------------------------------------------------*/

(function(window, undefined){
	var genesis = (function(){
		//var _root = {};
		/*Constructor*/
		var genesis = function(selector){
			
			/*Creando un nuevo objeto genesis*/
			/*if(element.indexOf(',') != -1){
				element.split(',').forEach(function(arr){
					return new genesis.fn.init(arr);
				});
			}*/
			//console.log('----------------------------------------');
			return new genesis.fn.init(selector);
		},
		_root = {},
		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
						window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		/*igualamos el contexto*/
		window.requestAnimationFrame = requestAnimationFrame;
		
		genesis.fn = {
			init: function(selector){
				if((selector !== undefined) && (selector !== null)){
					//_root.element = document.querySelector(element);
					genesis.context = selector;
					//console.log(genesis.fn.getNewContext(genesis));
					return genesis.fn.clone(genesis, selector);
				}else{
					return this;
				}
				
				//return genesis;
			},
			clone:function(context, selector){
				var obj = {};
				for(var key in context){
					var value = context[key];
					if(typeof(value) != 'object'){
						obj[key] = value;
					}else{
						obj[key] = this.clone(value);
					}
				}
				return obj;
			},
			build: {
				title: '..:: G E N E S I S ::..',
				name: 'genesis.js',
				version: '1.2.1',
				revision: '184'	
			},
			stage: {
				windowSize: function(){
					if(typeof window.innerWidth != 'undefined'){
						sizeWindow = [window.innerWidth,window.innerHeight];
					}else if(typeof document.documentElement != 'undefined'&& 
						typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){
						sizeWindow = [document.documentElement.clientWidth,document.documentElement.clientHeight];
					}else{
						sizeWindow = [document.getElementsByTagName('body')[0].clientWidth,document.getElementsByTagName('body')[0].clientHeight];
					}
					return sizeWindow;
				}
			},
			device: function(device){
				switch(device.toLowerCase()){
					case 'ios':
						var iOS = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) && (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform));
						if(iOS){
							return true;
						}else{
							return false;
						}
					break;
				}
			}
		};
		
		genesis.fn.init.prototype = genesis.fn;
		/*módulos para trabajar con pripiedades HTML*/
		
		genesis.html = function(str){
			//console.log(this.context);
			var _private = {};
			_private.element = document.querySelector(this.context);
			if((str !== undefined) && (str !== null)){
				_private.element.innerHTML = str;
			}else{
				return _private.element.innerHTML;	
			}
			return this;
		}

		genesis.attr = function(attr, value){
			var _private = {};
			_private.element = document.querySelector(this.context);
			if(value !== undefined){
				if(attr == 'value'){
					_private.element.value = value;
				}else{
					_private.element.setAttribute(attr, value);
				}
			}else{
				if(attr == 'value'){
					return (_private.element.value);
				}else{
					return (_private.element.getAttribute(attr));
				}
			}
		}
		
		genesis.css = function(options, ref){
			var _private = {};
			_private.values = [];
			if(_private.element === undefined){
				_private.element = document.querySelector(this.context);
			}
			if((typeof(options) !== 'object') && ((ref !== undefined) && (ref !== null))){
				eval('_private.element.style.' + options + ' = \"' + ref + ' \"');
			}else if((typeof(options) === 'object')){
				/*obtenemos la cadena JSON*/
				_private.json = JSON.stringify(options);
				/*eliminamos los corchetes de la cadena JSON*/
				_private.strJson = _private.json.substring(1, _private.json.length - 1);
				/* separamos los grupos -> "attr:value" */
				_private.jsonHash = _private.strJson.split(',');
				/* iteramos para separar la propiedad del valor */
				for(var i = 0; i < _private.jsonHash.length; i++){
					_private.values = _private.jsonHash[i].split(':');
					/* el resultado obtenido es -> "propiedad" "valor", utilizamos substring para eliminar las comillas en el caso de
					la propiedad */
					eval('_private.element.style.' + _private.values[0].substring(1, _private.values[0].length - 1) + ' = ' + _private.values[1]);
				}
			}else{
				return eval('_private.element.style.' + options);
			}
			return this;
		}
		/*agrega una clase a un elemento del DOM*/
		genesis.addClass =  function(className, callback){
			var _private = {};
			_private.element = document.querySelector(this.context);
			if(_private.element.className.indexOf(className) === -1){
				_private.element.className += ' ' + className;
			}
			if((callback !== undefined) && (callback !== null) && (typeof(callback) === 'function')){
				callback();	
			}
			return this;
		};
		/*Elimina una clase a un elemento del DOM*/
		genesis.removeClass =  function(className, callback){
			var _private = {};
			_private.element = document.querySelector(this.context);
			if(_private.element.className.indexOf(className) > -1){
				_private.expression = " " + className;//new RegExp('(\\s|^)' + className + '(\\s|$)');
				_private.element.className = _private.element.className.replace(_private.expression,"");
			}
			if((callback !== undefined) && (callback !== null) && (typeof(callback) === 'function')){
				callback();	
			}
			return this;	
		}

		genesis.each = function(fn){
			var _private = {};
			_private.element = document.querySelectorAll(this.context);
			_private.element.forEach(function(index){
				fn.call(genesis('.' + index.className), '.' + index.className);
			});
		}

		/* L I S T E N E R S */

		genesis.click = function(fn){
			var _private = {};
			_private.element = document.querySelector(this.context);
			_private.class = this.context;
			_private.element.addEventListener('click', function(e){
				fn.call(genesis(_private.class), e);
			});
			return this;
		}

		genesis.mouseover = function(fn){
			var _private = {};
			_private.element = document.querySelector(this.context);
			_private.class = this.context;
			_private.element.addEventListener('mouseover', function(e){
				fn.call(genesis(_private.class), e);
			});
			return this;
		}

		genesis.mousemove = function(fn){
			var _private = {};
			_private.element = document.querySelector(this.context);
			_private.class = this.context;
			_private.element.addEventListener('mousemove', function(e){
				fn.call(genesis(_private.class), e);
			});
			return this;
		}

		genesis.mouseout = function(fn){
			var _private = {};
			_private.element = document.querySelector(this.context);
			_private.class = this.context;
			_private.element.addEventListener('mouseout', function(e){
				fn.call(genesis(_private.class), e);
			});
			return this;
		}

		genesis.keypress = function(fn){
			var _private = {};
			_private.element = document.querySelector(this.context);
			_private.class = this.context;
			_private.element.addEventListener('keypress', function(e){
				fn.call(genesis(_private.class), e);
			});
			return this;
		}

		/*modulo para trabajar con los elementos del DOM*/
		
		genesis.drag = function(options){
			var _private = {
				element: document.querySelector(this.context), /*elemento del DOM sobre el que se ejecutará la función*/
				position: {
					x: 0,
					y: 0,
					mouseX: 0,
					mouseY: 0	
				}, 
				options: {}, /*propiedades del drageo*/
				draggin: false
			};
			
			if(!_root.drag){
				_root.drag = {
					index: 100	
				};
			};
			
			/*inicializamos las variables*/
			
			if((typeof options !== 'object' ) || (options === undefined) || (options === null)){
				/*si los parametros no están definidos aplicamos los valores predefinidos*/
				_private.options.cursor = 'default';
				_private.options.orientation = '';
				_private.options.index = undefined;
				_private.options.selectable = true;
				_private.options.click = undefined
				_private.options.onDrag = undefined;
				_private.options.callback = undefined;
			}else{
				_private.options.cursor = options.cursor; /*tipo de cursor*/
				_private.options.orientation = options.orientation || ''; /*tipo de orientación*/
				_private.options.index = options.index; /*z-index ?*/
				_private.options.selectable = options.selectable; /*indica si el contenido es seleccionable*/
				_private.options.click = options.click; /*evento click*/
				_private.options.onDrag = options.onDrag; /*evento drag*/
				_private.options.callback = options.callback; /*evento callback*/
			}
			/*asignamos el cursor al elemento*/
			_private.element.style.cursor = _private.options.cursor;
			_private.element.style.position = 'absolute';
			_private.element.style.margin = '0px';
			
				
			_private.element.addEventListener('mousedown', function(e){
				e = e || window.event;
				if(typeof(_private.options.click) === 'function'){
					_private.options.click();
				}
				if(_private.options.index){
					_root.drag.index++;
					_private.element.style.zIndex = _root.drag.index;
				}
				/*obtiene la posición del cursor al inicio*/
				_private.position.mouseX = e.clientX;
				_private.position.mouseY = e.clientY;
				document.onmouseup = stopDrag;
				/*ejecuta el procedimiento startDrag al mover el cursor*/
				document.onmousemove = startDrag;
				if(_private.options.selectable === false){
					document.onselectstart = function() { return false; }
					document.onmousedown = function() { return false; }
				}
			});
			
			function startDrag(e) {
			  e = e || window.event;
			  /*calcula la nueva posición del cursor*/
			  _private.position.x = _private.position.mouseX - e.clientX;
			  _private.position.y = _private.position.mouseY - e.clientY;
			  _private.position.mouseX = e.clientX;
			  _private.position.mouseY = e.clientY;
			  /*establece la nueva posición del elemento*/
			switch(_private.options.orientation.toLowerCase()){
				case 'vertical':
						_private.element.style.top = (_private.element.offsetTop - _private.position.y) + "px";
				break;
				case 'horizontal':
						_private.element.style.left = (_private.element.offsetLeft - _private.position.x) + "px";
				break;
				default:
					_private.element.style.top = (_private.element.offsetTop - _private.position.y) + "px";
					_private.element.style.left = (_private.element.offsetLeft - _private.position.x) + "px";
				break;
			}
			  /*ejecuta función del usuario al realizar el drag*/
			  if(typeof(_private.options.onDrag) === 'function'){
				  _private.options.onDrag();  
			  }
			}
			
			function stopDrag(){
				if(_private.options.selectable === false){
					document.onselectstart = function() {return true;}
					document.onmousedown = function() {return true;}
				}
			  	/*detiene el drag cuando el botón del mouse es suelto*/
			  	document.onmouseup = null;
			  	document.onmousemove = null;
				if(typeof(_private.options.callback) === 'function'){
				  _private.options.callback.call(genesis);
			 	}
			}
			return this;
		};
		
		/*sndPlaySound*/
		genesis.sndPlaySound = function(options){
			if(!_root.sound){
				_root.sound = []; /*contiene los id (tracks) */
				_root.sound.easy = false;
			}
			
			var _private = {}; /*contiene las propiedades que se utilizan en sndPlaySound*/
			
			
			/*Verificamos si options no es tipo objeto*/
			if(typeof options !== 'object'){/*configuramos propiedades predeterminadas*/
				_private.sound = {
					'src':options, 'streaming':false, 'volume':0.5, 'stopMixers':true, 'loop':undefined, 'startIn':0, 
					'onLoad':undefined, 'onLoading': undefined, 'onPlay':undefined, 'onWaiting':undefined, 'afterWaiting':undefined, 
					'onError':undefined, 'timeUpdate':undefined, 'seek':undefined, 'soundWave':undefined, 
					'soundComplete':undefined, 'enabledHTML':true
				}; 
			}else{/* si options es tipo objeto configuramos las propiedades establecidas por el usuario*/
				/*validamos si alguna propiedad no está establecida y configurar el valor predeterminado.*/
				if((options.volume === undefined) || (options.volume === null) || (options.volume < 0) || (options.volume > 1)){
					options.volume = 0.5;
				}
				if((options.stopMixers === undefined) || (options.stopMixers === null)){
					options.stopMixers = false;
				}
				if((options.startIn === undefined) || (options.startIn === null)){
					options.startIn = 0;
				}
				if((options.enabledHTML === undefined) |(options.enabledHTML === null)){
					options.enabledHTML = true;
				}

				_private.sound = {
					'src':options.src, 'streaming':options.streaming, 'volume':options.volume, 'stopMixers':options.stopMixers, 'loop':options.loop, 
					'startIn':options.startIn, 'onLoad':options.onLoad, 'onLoading':options.onLoading, 'onPlay':options.onPlay, 
					'onWaiting':options.onWaiting, 'afterWaiting':options.afterWaiting, 'onError':options.onError, 
					'timeUpdate':options.timeUpdate, 'seek':options.seek, 'soundWave':options.soundWave, 'soundComplete':options.soundComplete,
				   	'enabledHTML':options.enabledHTML
				};
			}

			/*Inizializamos el player a utilizar Flash o HTML5*/
			if(_private.sound.enabledHTML){
				_private.fn = { /*creación y asignación de métodos */
					main: function(){
						/* verificamos si stopMixers es true */
						if(_private.sound.stopMixers){
							/*invocamos al método stopMixers*/
							if(genesis.sndPlaySound.stopMixers()){
								/*si stopMixers devuelve true*/
								this.init();
							}else{
								this.error();
							}
						}else{/*si el usuario no asigno stopMixers true*/
							this.init();
						}
					},
					init: function(){
						_private.sound.exist = false;
						/*verificamos que _root.sound contenga por lo menos un valor*/
						if(_root.sound.length > 0){
							/*iteramos en busca de la existencia del sonido*/
							for(var i = 0; i < _root.sound.length; i++){
								if(_root.sound[i] === _private.sound.src){/*si el sonido existe */
									if(!_root.sound[_root.sound[i]].isPlay){
										/*habilitamos el procesamiento de soundWave si la función está definida*/
										if(typeof _private.sound.soundWave === 'function'){
											this.soundWave();
										}
										this.play(_private.sound.src, _private.sound.volume);
										_private.sound.exist = true;
										break;
									}
								}
							}
						/*}else{si _root.sound.length es 0 añadimos el primer elemento 
							this.addItem();*/
						}
						if(!_private.sound.exist){
							this.addItem();
						}
					},
					addItem: function(){
						//try{
							/*añadimos el elemento al array*/
							_root.sound.push(_private.sound.src);
							/*creamos el nuevo contexto de audio*/
							_root.sound[_private.sound.src] = new Audio();
							
							/*configuramos los parametros para la reproduccion*/
							_root.sound[_private.sound.src].isPlay = false;
							_root.sound[_private.sound.src].startIn = _private.sound.startIn;
							/*asignamos el source */
							_root.sound[_private.sound.src].src = _private.sound.src;
							_root.sound[_private.sound.src].currentTime = _private.sound.startIn;

							/*Listeners...*/

							/*onLoad: al iniciar la carga del medio*/
							if(typeof _private.sound.onLoad === 'function'){
								_root.sound[_private.sound.src].addEventListener('loadstart', function(){
									_private.sound.onLoad();
								});
							}

							/*play: al iniciar la reproduccion del medio*/
							if(typeof _private.sound.onPlay === 'function'){
								_root.sound[_private.sound.src].addEventListener('play', function(){
									_private.sound.onPlay();
								});
							}

							/*progress: carga del buffer del medio*/
							_root.sound[_private.sound.src].addEventListener('progress', function(){
								if(_root.sound[_private.sound.src].buffered.length > 0){
									_private.end = _root.sound[_private.sound.src].buffered.end(0);
									_private.duration = _root.sound[_private.sound.src].duration;
									_private.percent = Math.round(((_private.end / _private.duration) * 100));
									try{
										_private.sound.onLoading.call(_private.percent, _private.percent);
									}catch(e){}
								}
								
							});

							/*timeUpdate: al actualizar el currentTime del medio*/
							if(typeof _private.sound.timeUpdate === 'function'){
								_private.sound.time = {};
								_private.sound.time.duration = {};
								_private.sound.durationReady = false;
								_root.sound[_private.sound.src].addEventListener('timeupdate', function(){
									/*obtenemos la duración total del medio*/
									_private.fn.timeUpdate(_private.sound.src);
								});
							}

							/*onWaiting: al detenerse el medio por falta de datos*/
							if(typeof _private.sound.onWaiting === 'function'){
								_root.sound[_private.sound.src].addEventListener('waiting', function(){
									_private.sound.onWaiting();
								});
							}

							/*afterWaiting: cuando el reproductor esta listo despues de una falta de datos*/
							if(typeof _private.sound.afterWaiting === 'function'){
								_root.sound[_private.sound.src].addEventListener('playing', function(){
									_private.sound.afterWaiting();
								});
							}

							/*soundComplete: al finalizar el medio*/
							_root.sound[_private.sound.src].addEventListener('ended', function(){
								_root.sound[_private.sound.src].isPlay = false;
								if((typeof _private.sound.soundComplete === 'function') && (_private.sound.loop == undefined)){
									_private.sound.soundComplete();
								}
								if(_private.sound.loop !== undefined){
									_root.sound[_private.sound.src].currentTime = _private.sound.loop;
									_private.fn.play(_private.sound.src, _private.sound.volume);
								}
							});

							/*error: cuando existe un error en el procesamiento del medio*/
							if(typeof _private.sound.onError === 'function'){
								_root.sound[_private.sound.src].addEventListener('error', function(){
									_private.sound.onError();
								});
							}
							
							/*definimos los listeners para el seek*/
								
							if(_private.sound.seek !== undefined){
								
								_private.sound.seek.hold = false;
								_private.sound.seek = {
									'parent': document.querySelector(_private.sound.seek[0]),
									'fn': _private.sound.seek[1]
								}
								
								window.addEventListener('mouseup', function(e){
									//e.preventDefault();
									_private.sound.seek.hold = false;
								});

								_private.sound.seek.parent.addEventListener('mousedown', function(e){
									//e.preventDefault();
									_private.sound.seek.hold = true;
									_private.fn.seek(e, _private.sound.seek.parent, _private.sound.seek.fn);
								});

								window.addEventListener('mousemove', function(e){
									//e.preventDefault();
									if(_private.sound.seek.hold){
										_private.fn.seek(e, _private.sound.seek.parent, _private.sound.seek.fn);
									}
								});
							}

							/*Creamos el analizador de audio si la función soundWave está definida*/
							if(typeof _private.sound.soundWave === 'function'){
								this.createAnalyser();
							}

							/*canplaythrough: inicia la reproduccion cuando se estima que esta no se detendrá por falta de tados
							esta acción se ejecuta si streaming esta definido en false o no esta definido*/
							if((!_private.sound.streaming) && (_private.sound.streaming == undefined)){
								_root.sound[_private.sound.src].addEventListener('canplaythrough', function(){
									/*invocamos al metodo play */
									_private.fn.play(_private.sound.src, _private.sound.volume);
								});
							}else{
								/*invocamos al metodo play */
								_private.fn.play(_private.sound.src, _private.sound.volume);
							}
							
						//}catch(e){}
					},
					play: function(context, params){ /*reproducimos el sonido*/
						_root.sound[context].play();
						_root.sound[context].volume = params;
						_root.sound[context].isPlay = true;
					},
					error: function(){
						if(typeof _private.sound.onError === 'function'){
							_private.sound.onError();
						}
					},
					seek: function(e, parent, fn){
						/*obtenemos la posición del cursor dentro del contenedor seek*/
						_private.sound.seek.xPos = (e.pageX - parent.offsetLeft);
						if(_root.sound[_private.sound.src].isPlay){
							/*obtenemos el porcentaje de click dentro del seek*/
							_private.sound.seek.percent = Math.round((_private.sound.seek.xPos * 100) / parent.offsetWidth);
							if(_private.sound.seek.percent > 100){
								_private.sound.seek.percent = 100;
							}
							if(_private.sound.seek.percent < 0){
								_private.sound.seek.percent = 0;
							}
							/*establecemos el nuevo tiempo*/
							_root.sound[_private.sound.src].currentTime = ((_private.sound.seek.percent * _root.sound[_private.sound.src].duration) / 100);
							fn.call(_private.sound.seek.percent, _private.sound.seek.percent);
						}
					},
					timeUpdate:function(context){
						if(!_private.sound.durationReady){
							_private.sound.time.duration = function(format){
								_private.sound.time.duration.ss = parseInt(_root.sound[context].duration % 60); /*segundos*/
								_private.sound.time.duration.mm = parseInt(_root.sound[context].duration / 60); /*minutos*/
								_private.sound.time.duration.hh = parseInt(_private.sound.time.duration.mm / 60); /*horas*/
								if(_private.sound.time.duration.ss < 10){ /*si los segundos son menor a 10*/
									_private.sound.time.duration.ss = '0' + _private.sound.time.duration.ss;
								}
								if(_private.sound.time.duration.mm < 10){ /*si los minutos son menor a 10*/
									_private.sound.time.duration.mm = '0' + _private.sound.time.duration.mm;
								}
								if(_private.sound.time.duration.mm > 59){ /*si los minutos son menor a 59*/
									_private.sound.time.duration.mm =+ (_private.sound.time.duration.mm - (_private.sound.time.duration.hh * 59) - _private.sound.time.duration.hh);
									if(_private.sound.time.duration.mm < 10){ /*si los minutos son menor a 10*/
										_private.sound.time.duration.mm = '0' + _private.sound.time.duration.mm;
									}
								}
								if(_private.sound.time.duration.hh < 10){ /*si las horas son menor a 10*/
									_private.sound.time.duration.hh = '0' + _private.sound.time.duration.hh;
								}
								isNaN(_private.sound.time.duration.ss)?_private.sound.time.duration.ss = '00':'';
								isNaN(_private.sound.time.duration.mm)?_private.sound.time.duration.mm = '00':'';
								isNaN(_private.sound.time.duration.hh)?_private.sound.time.duration.hh = '00':'';
								switch(format.toLowerCase()){
									case 'ss':
										return _private.sound.time.duration.ss;
									break;
									case 'mm':
										return _private.sound.time.duration.mm;
									break;
									case 'hh':
										return _private.sound.time.duration.hh;
									break;
									case 'mm:ss':
										return _private.sound.time.duration.mm + ':' + _private.sound.time.duration.ss;
									break;
									case 'hh:mm:ss':
										return _private.sound.time.duration.hh + ':' + _private.sound.time.duration.mm + ':' + _private.sound.time.duration.ss;
									break;
									default:
										return '-:-:-';
									break;
								}
							}
						}
						_private.sound.durationReady = true;

						/*Obtenemos el progreso de tiempo del medio*/
						_private.sound.time.progress = function(format){
							_private.sound.time.progress.ss = parseInt(_root.sound[context].currentTime % 60); /*segundos*/
							_private.sound.time.progress.mm = parseInt(_root.sound[context].currentTime / 60); /*minutos*/
							_private.sound.time.progress.hh = parseInt(_private.sound.time.progress.mm / 60); /*horas*/
							if(_private.sound.time.progress.ss < 10){ /*si los segundos son menor a 10*/
								_private.sound.time.progress.ss = '0' + _private.sound.time.progress.ss;
							}
							if(_private.sound.time.progress.mm < 10){ /*si los minutos son menor a 10*/
								_private.sound.time.progress.mm = '0' + _private.sound.time.progress.mm;
							}
							if(_private.sound.time.progress.mm > 59){ /*si los minutos son mayor a 59*/
								_private.sound.time.progress.mm =+ (_private.sound.time.progress.mm - (_private.sound.time.progress.hh * 59) - _private.sound.time.progress.hh);
								if(_private.sound.time.progress.mm < 10){ /*si los minutos son menor a 10*/
									_private.sound.time.progress.mm = '0' + _private.sound.time.progress.mm;
								}
							}
							if(_private.sound.time.progress.hh < 10){ /*si las horas son menor a 10*/
								_private.sound.time.progress.hh = '0' + _private.sound.time.progress.hh;
							}
							isNaN(_private.sound.time.progress.ss)?_private.sound.time.progress.ss = '00':'';
							isNaN(_private.sound.time.progress.mm)?_private.sound.time.progress.mm = '00':'';
							isNaN(_private.sound.time.progress.hh)?_private.sound.time.progress.hh = '00':'';
							switch(format.toLowerCase()){
								case 'ss':
									return _private.sound.time.progress.ss;
								break;
								case 'mm':
									return _private.sound.time.progress.mm;
								break;
								case 'hh':
									return _private.sound.time.progress.hh;
								break;
								case 'mm:ss':
									return _private.sound.time.progress.mm + ':' + _private.sound.time.progress.ss;
								break;
								case 'hh:mm:ss':
									return _private.sound.time.progress.hh + ':' + _private.sound.time.progress.mm + ':' + _private.sound.time.progress.ss;
								break;
								default:
									return '-:-:-';
								break;
							}
						}
						/*obtenemos el porcentaje de progreso del medio*/
						_private.sound.time.percent = ((_root.sound[context].currentTime * 100) /
													  (_root.sound[context].duration));

						
						if(_root.sound[context].isPlay){
							_private.sound.timeUpdate.call(_private.sound.time, _private.sound.time);
						}
					},
					createAnalyser:function(){
						/*Preparamos el contexto para la pista de audio actual*/
						_root.sound[_private.sound.src].audioContext = {};
						/*Igualamos los contextos para los diferentes navegadores*/
						window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || 
						window.oAudioContext || window.msAudioContext;
						/*creamos un nuevo contexto*/
						_root.sound[_private.sound.src].audioContext.context = new AudioContext();
						/*creamos el analizador de frecuencia*/
						_root.sound[_private.sound.src].audioContext.analyser = _root.sound[_private.sound.src].audioContext.context.createAnalyser();
						_root.sound[_private.sound.src].audioContext.created = true;
						/*creamos el media element*/
						_root.sound[_private.sound.src].audioContext.source = 
						_root.sound[_private.sound.src].audioContext.context.createMediaElementSource(_root.sound[_private.sound.src]);
						/*conectamos con el analizador de frecuencia*/
						_root.sound[_private.sound.src].audioContext.source.connect(_root.sound[_private.sound.src].audioContext.analyser);
						/*conectamos con el destion*/
						_root.sound[_private.sound.src].audioContext.analyser.connect(_root.sound[_private.sound.src].audioContext.context.destination);
						this.soundWave();
					},
					soundWave:function(){
						_root.sound[_private.sound.src].audioContext.bitArray = new Uint8Array(_root.sound[_private.sound.src].audioContext.analyser.frequencyBinCount);
						_root.sound[_private.sound.src].audioContext.analyser.getByteFrequencyData(_root.sound[_private.sound.src].audioContext.bitArray);
						_private.sound.soundWave.apply(this, [_root.sound[_private.sound.src].audioContext.bitArray]);
						_root.sound.requestAnimationFrame = window.requestAnimationFrame(_private.fn.soundWave);
					}		
				}
				_private.fn.main();
			}else{
				/*Flash Player*/
				console.log('Shockwave flash is deprecated');	
			}
		};
		
		/*detiene una o todas las pistas de audio */
		genesis.sndPlaySound.stopMixers = genesis.sndPlaySound.prototype = function(id){
			try{
				/*provamos detener el o los sonidos segun se especifíque en la función*/
				if((id !== undefined) && (id !== null)){
					if(_root.sound[id].isPlay){
						_root.sound[id].pause();
						_root.sound[id].currentTime = _root.sound[id].startIn;
						_root.sound[id].isPlay = false;
						cancelAnimationFrame(_root.sound.requestAnimationFrame);
					}
				}else{ /*iteramos sobre todos los sonidos para detenerlos*/
					if(_root.sound.length > 0){ /*verificamos que _root.sound contenga por lo menos un valor*/
						for(var i = 0; i < _root.sound.length; i++){
							if(_root.sound[_root.sound[i]].isPlay){
								_root.sound[_root.sound[i]].pause();
								_root.sound[_root.sound[i]].isPlay = false;
								_root.sound[_root.sound[i]].currentTime =_root.sound[_root.sound[i]].startIn;
								cancelAnimationFrame(_root.sound.requestAnimationFrame);
							}
						}
					}
				}
				return true;
			}catch(e){
				return false;	
			}
		};

		/*manipula el volume de una o todas las pistas de audio */
		genesis.sndPlaySound.volume = genesis.sndPlaySound.prototype = function(value, ref){
			try{
				/*validamos que value este definido y que el valor este en el rango */
				if((value !== undefined) && (value > 0) && (value < 1)){
					/* validamos si existe una referencia*/
					if(ref !== undefined){
						/*aplicamos el valor sobre la referencia si está en reproduccion*/
						if(_root.sound[ref].isPlay){
							_root.sound[ref].volume = value;
						}
					}else{
						/*iteramos y aplicamos el valor a cada elemento que este en reproduccion */
						for(var i = 0; i < _root.sound.length; i++){
							if(_root.sound[_root.sound[i]].isPlay){
								_root.sound[_root.sound[i]].volume = value;
							}
						}
					}
					
				}
			}catch(e){}
			
		};

		genesis.ajax = function(options, callback){
			var _local = {
				options: {},
				xhr: undefined,
				ieXMLHTTP: ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'],
				fn: {
					createXHR: function(){ /*función que crea el objeto xhr*/
						if (window.XMLHttpRequest){
							_local.xhr = new XMLHttpRequest();
						} else if (window.ActiveXObject) {
							/*recorremos el array para encontrar la version válida en internet explorer*/
							for(var i = 0; i < this.ieXMLHTTP.length; i++){
								try{
									_local.xhr = new ActiveXObject(this.ieXMLHTTP[i]);
									break;
								}catch(e){}
							}
						}
					},
					noCache: function(){ /*Método que devuelve una cadena Date para evitar la caché*/
						var cache = new Date();
						return cache.getMonth() 
						+ cache.getDate() 
						+ cache.getHours() 
						+ cache.getMinutes() 
						+ cache.getSeconds() 
						+ cache.getTime();
					}
				}
			};
			
			if(typeof options === 'string'){
				_local.options = {
					'async': true,
					'method': 'get',
					'location': options,
					'args': '',
					'onError': undefined,
					'dataArrival': undefined,
				}
			}else{
				_local.options = {
					'async': options.async || true,
					'method': options.method.toLowerCase(),
					'location': options.location,
					'args': options.args || '',
					'onError': options.onError,
					'dataArrival': options.dataArrival,
					'callback': options.callback
				}
			}

			_local.fn.createXHR();/*creando el objeto xhr*/
			/*declaramos las variables para las cadena de variables a enviar según el método utlizado*/
			_local.options.get = '';
			_local.options.post = '';
			/*armamos una cadena de variables dependiendo del método a utilizar*/
			if( _local.options.method === 'get' ) {
				_local.options.get = '';
				/*iteramos sobre el contenido de _local.options.args*/
				for( var keyName in _local.options.args ) {
					_local.options.get+= keyName + '=' + _local.options.args[ keyName ] + '&';
				}
				_local.options.get;
			}else{
				for(var keyNamePost in _local.options.args){
					_local.options.post+= keyNamePost + '=' + _local.options.args[keyNamePost] + '&';
				}
				_local.options.post+= 'noCache=' + _local.fn.noCache();
			}
			/*si el objeto xhr se creó satisfactoriamente*/
			if(_local.xhr){
				/*configuramos la petición*/
				_local.xhr.open(_local.options.method, _local.options.location + _local.options.get, _local.options.async);
				/*preparamos la conexión*/
				_local.xhr.onreadystatechange = function(){
					/*Datos completos*/
					if(_local.xhr.readyState === 4){
						/*la petición se procesó correctamente*/
						if(_local.xhr.status === 200){
							if(typeof options === 'string'){
								if(typeof callback === 'function'){
									callback.call(_local.xhr.responseText, _local.xhr.responseText);
								}
							}else{
								if(typeof _local.options.dataArrival === 'function'){
									_local.options.dataArrival.call(_local.xhr.responseText, _local.xhr.responseText);
								}
							}
						}else{ /*si la petición no se procesó correctamente*/
							_local.options.errNumber = _local.xhr.status;
							if(typeof _local.options.onError === 'function'){
								_local.options.onError.call(_local.options.errNumber, _local.options.errNumber);
							}
						}
						/*si existe un callback*/
						if(typeof _local.options.callback === 'function'){
							_local.options.callback();
						}
					}
				}

				_local.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				_local.xhr.send(_local.options.post);
			}
		};

		genesis.history = genesis.prototype = function(history){
			var _private = {
				init: function(){
					window.addEventListener('hashchange', function(){
						_private.history(window.location.hash);
					});
				},
				history: function(hash){
					if(((hash === '') || hash.length === 0) && (typeof(history.default) === 'function')){
						history.default();
					}else{
						var index = hash.substring(2, hash.length);
						for(var key in history){
							if(key == index){
								history[key]();
								break;
							}
						}
					}
				}
			}
			if(_root.history === undefined){
				_root.history = true;
				_private.init();
				_private.history(window.location.hash);
			}
		}

		genesis.history.add = genesis.history.prototype = function(hash){
			window.location.hash = '/' + hash;
		}
		
		genesis.history.remove = genesis.history.prototype = function(hash){
			window.location.hash = '';
		}

		genesis.history.replace = genesis.history.prototype = function(hash){
			if(hash.indexOf('#') !== -1){
				window.location.replace(hash);
			}else{
				window.location.replace('#/' + hash);
			}
		}

		/*Registramos el objeto genesis para ser utilizado _$ || genesis*/
		window._$ = window.genesis = genesis;
	})();
})(window);

/*
Pending:

_$().attr -> permitir que se pueda manejar una cadena JSON


ERRORES DE COMPILACIÓN:

1.- var obj = _$(elemento);    [RESUELTO]
elemento.css(atributo, valor);

_$(elemento2).css(atributo, valor);

obj.css(atributo, valor) <-- se le aplica a elemento2 y no a obj

------------------------------------------------------------------------------------------------------

2.- this no corresponde al objeto en cuestion, sino al ultimo elemento capturado...

var uno = _$(elemento1);
var dos = _$(elemento2);


dos.click(){
	this //corresponde a uno...
}


*/






/**
 * 315   5032 metodos HTML... 
 */