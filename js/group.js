document.addEventListener('DOMContentLoaded', function() {
  // console.log(); находит в js-ce ошибку. Deftools



  /*Клик БУРГЕР-Саши*/
  // $ предполагает использование библиотеки jQuery. В codepen-е без неё работает, в других местах без библиотеки jQuery не работает
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#menu');

  burger.addEventListener('click',  function() {
    burger.classList.add('open');

    menu.classList.toggle('is-active');
    
    if (menu.classList.contains('is-active')) {
     menu.style.transition = 'transform .7s ease-in-out';
   }
  });
  menu.addEventListener('transitionend', function () {
    if (!menu.classList.contains('is-active')) {
        menu.style.transition = '';
        burger.classList.remove('open');
   }
  });
  



  // inputmask - Телефон
  const form = document.querySelector('.form-js');
  if (form) {// Обёртка if. Спасение Gulp-а от null в браузере 
    const telSelector = form.querySelector('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    new window.JustValidate('.form-js', {
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLenght: 10,
          /*strength: {
          //custom: '^[а-яёЁ\s]+$'только по русски текст
          //custom: '^[a-yeO\s]+$'только по английски текст
          }*/
        }, 
        tel: {
          required: true,
          function: () => {
            const phone = telSelector.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          }
        }, 
        checkbox: { // Обязательная галка
          required: true
        }
      },
      colorWrong: '#ff0f0f',
      messages: {
        name: {
          required: 'Введите ваше имя',
          minLength: 'Введите 3 и более символов',
          maxLength: 'Запрещено вводить более 15 символов'
          // strength: 'Текст только по русски'
          //strength: 'Текст только по английски'
        },
        // email: {
        //   email: 'Недопустимый формат',
        //   required: 'Введите email'
        // },
        tel: {
          required: 'Введите ваш телефон',
          function: 'Здесь должно быть 10 символов без +7'
        },
        checkbox: {
          required: 'Поставьте галочку',
          function: 'Здесь должна быть галка'
        }
      },

      submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        }

        // method отправляет на сервер POST   
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        thisForm.reset();
      }
    })
  };



  // Модальное окно для нескольких окон. Модалка не прокручиваеться.//
  const activeClass = "modal-active";
  const buttons = document.querySelectorAll(".modalBtn-js");

  for (let button of buttons) {
    modalEvent(button);
  }
  
  function closeModal (modal) {
	 modal.classList.remove(activeClass);
	 document.body.style.overflow  = '';
  }
	  
  function modalEvent(button) {
    button.addEventListener("click", (e) => {//(e) - дефолт - чтобы при нажитие на модального окна, модалка не улетала вверх.
      e.preventDefault();

      const trigger = button.getAttribute("data-modal-trigger");
      const modal = document.querySelector(`[data-modal=${trigger}]`);
      const modalContent = modal.querySelector(".modal-container");
      const close = modal.querySelector(".modal-close");
           
      /* --Cтили body при открытие модального окна-- */
      modal.classList.add('modal-active');		 
      if (modal.classList.contains(activeClass)) {
        document.body.style.overflow  = 'hidden';
      }

      close.addEventListener("click", () =>  {
		 closeModal (modal); 
	  });
      modal.addEventListener("click", () => {
		 closeModal (modal); 
	  });
      modalContent.addEventListener("click", (e) => e.stopPropagation());
      
    });
  }; 

   


  //Плавный скролл по якорям. В любое место можно кинуть. Всегда ниже всех. Библиотеку jquery(пол..) в html. Работает с помощбю id(#)//
  $(function(){
    $('a[href^="#"]').click(function(){
      var target = $(this).attr('href');
      $('html, body').animate({scrollTop: $
    (target).offset().top},800);
      return false;
    })
  });
  







  










});