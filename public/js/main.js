+function ($)
{
    "use strict";

    $(function()
    {

        // ext inputs options
        // webshims.setOptions('forms-ext', {
        //     replaceUI: 'auto',
        //     types: 'number'
        // });
        // webshims.polyfill('forms forms-ext');

        /*--
            serialize form to send data json
        -----------------------------------*/
        $.fn.serializeObject = function()
        {
            var o = {};
            var a = this.serializeArray();

            console.log('have file in form', this.find('[id^="fichier_"]').val());

            $.each(a, function()
            {
                if (o[this.name])
                {
                    if (!o[this.name].push)
                    {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                }
                else
                {
                    o[this.name] = this.value || '';
                }
            });


            if (this.find('[id^="fichier_"]').val())
            {
                var fichier = document.getElementById(this.find('[id^="fichier_"]').attr('id'));
                var fileReader = new FileReader();
                fileReader.onload = function() {
                    o['fichier'] = fileReader.result;
                };
                fileReader.readAsDataURL(fichier.files[0]);
            }
            // o['fichier'] = "successfull";

            return o;
        };


        $.fn.validate = function()
        {
            console.log('formulaire = ', $('#nbpiece_detail[0]_reservation').val());

            var prefixeForm = $(this).attr('id').substr(8, $(this).attr('id').length-1);

            var o = {};
            var a = this.serializeArray();
            var is_validate = true;
            $.each(a, function()
            {
                var itemValue = this.name + '_' + prefixeForm;
                console.log(itemValue);
                var itemId = '#' + itemValue;
                var displayField = $('[for="'+ itemValue +'"]').html() ? $('[for="'+ itemValue +'"]').html() : this.name;

                try
                {

                    $(itemId).removeClass('border-danger');
                if ($(itemId).hasClass('required') && !this.value)
                {
                    $(itemId).addClass('border-danger');
                    iziToast.error({
                        title: "Formulaire",
                        message: "Renseignez le champ <span class=\"font-weight-bold\">" + displayField + "</span>",
                        position: 'topRight'
                    });
                    is_validate = false;
                }
                }
                catch (e)
                {
                    console.log('validate =', e);
                }


                return is_validate;
            });


            if (is_validate)
                $.each(this.find('[id^="fichier_"]'), function () {
                    var itemValue = this.name + '_' + prefixeForm;
                    console.log(itemValue);
                    var itemId = '#' + itemValue;
                    var displayField = $('[for="'+ itemValue +'"]').html() ? $('[for="'+ itemValue +'"]').html() : this.name;
                    $(itemId).removeClass('border-danger');
                    if ($(itemId).hasClass('required') && !this.value)
                    {
                        $(itemId).addClass('border-danger');
                        iziToast.error({
                            title: "Formulaire",
                            message: "Choisir un fichier pour le champ <span class=\"font-weight-bold\">" + displayField + "</span>",
                            position: 'topRight'
                        });
                        is_validate = false;
                    }
                    return is_validate;
                });
            
            return is_validate;
        };




        /*--
                class
        -----------------------------------*/
        $(document).on('click', '[data-toggle^="class"]', function (e)
        {
            e && e.preventDefault();
            var $this = $(e.target), $class, $target, $tmp, $classes, $targets;
            !$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
            $class = $this.data()['toggle'];
            $target = $this.data('target') || $this.attr('href');
            $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
            $target && ($targets = $target.split(','));
            $classes && $classes.length && $.each($targets, function (index, value) {
                if ($classes[index].indexOf('*') !== -1) {
                    var patt = new RegExp('\\s' +
                        $classes[index].replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') +
                        '\\s', 'g');
                    $($this).each(function (i, it) {
                        var cn = ' ' + it.className + ' ';
                        while (patt.test(cn)) {
                            cn = cn.replace(patt, ' ');
                        }
                        it.className = $.trim(cn);
                    });
                }
                ($targets[index] != '#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
            });
            $this.toggleClass('active');
        });


        /*--
                blockUI
        -----------------------------------*/
        $.fn.blockUI_start = function ()
        {
            $(this).block({
                message: '<i class="fa fa-lg fa-refresh fa-spin"></i>' ,
                css: {
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    padding: '30px',
                    width: '100%'
                },
                overlayCSS:  {
                    backgroundColor:	'#000',
                    opacity:			0.5
                }
            });
        };

        $.fn.blockUI_stop = function ()
        {
            $(this).unblock();
        };


        /*--
                fullCalendar
        -----------------------------------*/
        $.fn.initCalendar = function (data)
        {
            if (!$('#calendar').hasClass('fc'))
            {
                console.log("adorand here", );

                $('#calendar').fullCalendar({
                    locale: 'fr', // Permet de mettre le calendrier en francais
                    header: {
                        left: 'today, prev,next',
                        center: 'title',
                        right: 'timelineDay,timelineMonth'
                    },
                    defaultView: 'timelineMonth',
                    resourceLabelText: 'Nombre',
                    businessHours: true, // display business hours
                    resources: [
                        {id: '1'},
                        {id: '2'},
                        {id: '3'},
                        {id: '4'},
                        {id: '5'},
                        {id: '6'},
                        {id: '7'},
                        {id: '8'},
                        {id: '9'},
                        {id: '10'},
                        {id: '11'},
                        {id: '12'},
                        {id: '13'},
                        {id: '14'},
                        {id: '15'},
                        {id: '16'},
                        {id: '17'},
                        {id: '18'},
                        {id: '19'},
                        {id: '20'},
                        {id: '21'},
                        {id: '22'},
                        {id: '23'},
                        {id: '24'},
                        {id: '25'},
                    ],
                    events: data
                });

                $(".fc-today-button").html("Aujourd'hui");
                $(".fc-timelineDay-button").html("Jour");
                $(".fc-timelineMonth-button").html("Mois");
            }
            else
            {
                console.log('calendrier here',data, $.fullCalendar);

                $('#calendar').fullCalendar( 'removeEvents' );
                $('#calendar').fullCalendar('addEventSource', data);
                $('#calendar').fullCalendar( 'rerenderEvents' );

            }


        };


        $(this).initCalendar();



    });


}(window.jQuery);
