/**
 * Created on 14.08.2019.
 */


const mainButton = document.querySelector('.create-visit');//главная кнопка "Создать визит"
const select = document.querySelector('.select');// Выбор врача
const visitorName = document.getElementById('fullname-input');//ФИО пациента
const target = document.getElementById('target-input');//Цель визита
const nextVisit = document.getElementById('next-visit-input');//Дата следующего визита
const illnessList = document.getElementById('illness-input');//Список перенесенных заболеваний
const lastVisit = document.getElementById('last-visit-input');//Дата последнего визита
const weighClient = document.getElementById('weight-input');//Индекс массы тела
const ageClient = document.getElementById('age-input');//Возраст пациента
const comment = document.getElementById('comment-input');//Комментарии
const modalButton = document.querySelector('.btn-modal');//Кнопка "Создать визит" на модальном окне
const modalCrossButton = document.querySelector('.cross'); //кнопка-крестик на модальном окне
const pressureValue = document.getElementById('pressure-input'); //давление
const modalWindow = document.querySelector('.modal'); //Модальное окно
const inputFields = document.querySelectorAll('.field-for-doctors'); //Инпуты
const labelForNextVisit = document.getElementById('label-for-next-visit'); //Лейбл для следующего визита
const labelForLastVisit = document.getElementById('label-for-last-visit'); // Лейбл для последнего визита

let dragStatus = false;
let shiftX;
let shiftY;

let visits=[];
function addVisit(visitObj){
    visits.push(visitObj);
    console.log(visits);
}

function checkVisits(visits) {
    console.log('function check visits apllied');
    const noVisitsText = document.querySelector('.no-visit');
    if(visits.length===0){
        noVisitsText.classList.add('active');
    }else{
        noVisitsText.classList.remove('active');
    }
}

function pushVisitsToLocalStorage(visits) {
    console.log('visits.length',visits.length);
    if(visits.length>0){
        let localStorageVisits = JSON.stringify(visits);
        localStorage.setItem('localVisits',localStorageVisits);
    }else{
        localStorage.clear();
    }
}
window.onload = checkVisits(visits);
window.onload = function(){
    checkLocalStorage();
};
window.ondragstart = (e) => {
    e.preventDefault()
};

class Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, comments) {
        this._doctor = doctor;
        this._visitDate = visitDate;
        this._fullname = fullName;
        this._visitTarget = visitTarget;
        this._visitId = visitID;
        this._comments = comments;
        this._newCard = document.createElement('div');
        this._showMoreButton = document.createElement('button');
        this._p = document.createElement('p');
        this._span = document.createElement('span');
    }
    get visitId(){
        return this._visitId;
    }
    createNewCard() {
        this._p.className = 'name-of-field';

        let  nameField = this._p.cloneNode(),
             doctorField = this._p.cloneNode(),
             visitField = this._p.cloneNode();

        this._newCard.setAttribute('data-visitId', this._visitId);
        this._newCard.className = 'visiting-card';
        this._showMoreButton.className = 'show-more ';
        this._span.className = 'close';
        this._span.innerHTML = '<i class="fas fa-times"></i>';
        this._showMoreButton.innerText = "Показать больше";


        // nameField.insertAdjacentHTML('afterbegin', `ФИО:&nbsp${this._fullname}`);
        nameField.innerHTML = `ФИО:&nbsp${this._fullname}`;
        doctorField.innerHTML = `Врач:&nbsp${this._doctor}`;
        visitField.innerHTML = `Дата визита:&nbsp${this._visitDate}`;

        this._newCard.appendChild(this._span);
        this._newCard.appendChild(nameField);
        this._newCard.appendChild(doctorField);
        this._newCard.appendChild(visitField);
        this._newCard.appendChild(this._showMoreButton);
        return this._newCard;
    }

    dragManager(dragStatus,shiftX,shiftY){
        this._newCard.addEventListener('mousedown', function (event) {
                dragStatus = true;
                console.log(this);
                this.style.position = 'fixed';
                this.style.zIndex = '10';
                shiftX = event.clientX - this.getBoundingClientRect().left;
                shiftY = event.clientY - this.getBoundingClientRect().top;
                console.log(event.clientY);
                console.log(event.clientY);
                console.log(shiftX);
                console.log(shiftY);
                this.style.left = event.pageX - shiftX + 'px';
                this.style.top = event.pageY - shiftY + 'px';
            });

    }
}


// board.onmousedown = function(event) {
//     let elem = event.target.closest('.visiting-card');
//
//     let shiftX = event.clientX - elem.getBoundingClientRect().left;
//     let shiftY = event.clientY - elem.getBoundingClientRect().top;
//
//     elem.style.position = 'absolute';
//     elem.style.zIndex = 1000;
//     document.body.append(elem);
//
//     moveAt(event.pageX, event.pageY);
//
//     // переносит мяч на координаты (pageX, pageY),
//     // дополнительно учитывая изначальный сдвиг относительно указателя мыши
//     function moveAt(pageX, pageY) {
//         elem.style.left = pageX - shiftX + 'px';
//         elem.style.top = pageY - shiftY + 'px';
//     }
//
//     function onMouseMove(event) {
//         moveAt(event.pageX, event.pageY);
//     }
//
//     // передвигаем мяч при событии mousemove
//     document.addEventListener('mousemove', onMouseMove);
//
//     // отпустить мяч, удалить ненужные обработчики
//     elem.onmouseup = function() {
//         document.removeEventListener('mousemove', onMouseMove);
//         elem.onmouseup = null;
//     };
//
// };
//
// board.ondragstart = function() {
//     return false;
// };

// const DragManager = new function() {
//     const board = document.querySelector('.board-container');
//     let dragObject = {};
//     let self = this;
//
//     function onMouseDown(e) {
//
//         if (e.which != 1) return;
//
//         let elem = e.target.closest('.visiting-card');
//         if (!elem) return;
//
//         dragObject.elem = elem;
//
//         dragObject.downX = e.pageX;
//         dragObject.downY = e.pageY;
//
//         return false;
//     }
//
//     function onMouseMove(e) {
//         if (!dragObject.elem) return;
//
//         if (!dragObject.avatar) {
//             let moveX = e.pageX - dragObject.downX;
//             let moveY = e.pageY - dragObject.downY;
//
//             if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
//                 return;
//             }
//
//             dragObject.avatar = createAvatar(e);
//             if (!dragObject.avatar) {
//                 dragObject = {};
//                 return;
//             }
//
//             let coords = getCoords(dragObject.avatar);
//             dragObject.shiftX = dragObject.downX - coords.left;
//             dragObject.shiftY = dragObject.downY - coords.top;
//
//             startDrag(e);
//         }
//
//         dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
//         dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
//
//         return false;
//     }
//
//     function onMouseUp(e) {
//         if (dragObject.avatar) {
//             finishDrag(e);
//         }
//         dragObject = {};
//     }
//
//     function finishDrag(e) {
//         let dropElem = findDroppable(e);
//
//         if (!dropElem) {
//             self.onDragCancel(dragObject);
//         } else {
//             self.onDragEnd(dragObject, dropElem);
//         }
//     }
//
//     function createAvatar(e) {
//         let avatar = dragObject.elem;
//         let old = {
//             parent: avatar.parentNode,
//             nextSibling: avatar.nextSibling,
//             position: avatar.position || '',
//             left: avatar.left || '',
//             top: avatar.top || '',
//             zIndex: avatar.zIndex || ''
//         };
//
//         avatar.rollback = function() {
//             old.parent.insertBefore(avatar, old.nextSibling);
//             avatar.style.position = old.position;
//             avatar.style.left = old.left;
//             avatar.style.top = old.top;
//             avatar.style.zIndex = old.zIndex
//         };
//         return avatar;
//     }
//
//     function startDrag(e) {
//         let avatar = dragObject.avatar;
//         document.body.appendChild(avatar);
//         avatar.style.zIndex = 9999;
//         avatar.style.position = 'absolute';
//     }
//
//     function findDroppable(event) {
//         dragObject.avatar.hidden = true;
//
//         let elem = document.elementFromPoint(event.clientX, event.clientY);
//
//         dragObject.avatar.hidden = false;
//
//         if (elem == null) {
//             return null;
//         }
//         return elem.closest('.visiting-card');
//     }
//
//     board.onmousemove = onMouseMove;
//     board.onmouseup = onMouseUp;
//     board.onmousedown = onMouseDown;
//
//     this.onDragEnd = function(dragObject, dropElem) {};
//     this.onDragCancel = function(dragObject) {};
//
// };


// function getCoords(elem) {
//     let box = elem.getBoundingClientRect();
//     return {
//         top: box.top + pageYOffset,
//         left: box.left + pageXOffset
//     };
// }

class VisitToCardiologist extends Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, pressure, weightIndex, age, illnesses, comments) {
        super(doctor, visitDate, fullName, visitTarget, visitID, comments);
        this._pressure = pressure;
        this._weightIndex = weightIndex;
        this._age = age;
        this._illnesses = illnesses;
    }
  showMore() {
      this._showMoreButton.addEventListener('click', () => {
          this._showMoreButton.style.display = 'none';
         let  targetField = this._p.cloneNode(),
              pressureField = this._p.cloneNode(),
              weightField = this._p.cloneNode(),
              illnessesField = this._p.cloneNode(),
              ageField = this._p.cloneNode(),
              comments = this._p.cloneNode();

          targetField.innerHTML = `Цель визита:&nbsp${this._visitTarget}`;
          pressureField.innerHTML = `Давление:&nbsp${this._pressure}`;
          weightField.innerHTML = `Вес:&nbsp${this._weightIndex}`;
          illnessesField.innerHTML = `Болезни:&nbsp${this._illnesses}`;
          ageField.innerHTML = `Возраст:&nbsp${this._age}`;
          comments.innerHTML = `Комментарии:&nbsp${this._comments}`;

          this._newCard.insertBefore(ageField, this._showMoreButton);
          this._newCard.insertBefore(illnessesField, this._showMoreButton);
          this._newCard.insertBefore(weightField, this._showMoreButton);
          this._newCard.insertBefore(pressureField, this._showMoreButton);
          this._newCard.insertBefore(targetField, this._showMoreButton);
          this._newCard.insertBefore(comments, this._showMoreButton);

      })
  }
}
class VisitToDentist extends Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, lastVisitDate, comments) {
        super(doctor, visitDate, fullName, visitTarget, visitID, comments);
        this._lastVisitDate = lastVisitDate;
    }

    showMore() {
        this._showMoreButton.addEventListener('click', () => {
            this._showMoreButton.style.display = 'none';
            let targetField = this._p.cloneNode(),
                lastVisitDateField = this._p.cloneNode(),
                comments = this._p.cloneNode();

            targetField.innerHTML = `Цель визита:&nbsp${this._visitTarget}`;
            lastVisitDateField.innerHTML = `Дата последнего визита:&nbsp${this._lastVisitDate}`;
            comments.innerHTML = `Комментарии:&nbsp${this._comments}`;
            this._newCard.insertBefore(lastVisitDateField, this._showMoreButton);
            this._newCard.insertBefore(targetField, this._showMoreButton);
            this._newCard.insertBefore(comments, this._showMoreButton);
        })
    }
}
class VisitToTherapist extends Visit {
    constructor(doctor, visitDate, fullName, visitTarget, visitID, age, comments) {
        super(doctor, visitDate, fullName, visitTarget, visitID, comments);
        this._age = age;
    }
    showMore() {
        this._showMoreButton.addEventListener('click', () => {
            this._showMoreButton.style.display = 'none';
            let targetField = this._p.cloneNode(),
                ageField = this._p.cloneNode(),
                comments = this._p.cloneNode();

            targetField.innerHTML = `Цель визита:&nbsp${this._visitTarget}`;
            ageField.innerHTML = `Возраст:&nbsp${this._age}`;
            comments.innerHTML = `Комментарии:&nbsp${this._comments}`;
            this._newCard.insertBefore(ageField, this._showMoreButton);
            this._newCard.insertBefore(targetField, this._showMoreButton);
            this._newCard.insertBefore(comments, this._showMoreButton);
        })
    }
}
function checkLocalStorage() {

    let localStorageVisits = localStorage.getItem('localVisits');
    console.log('localStorageVisits',localStorageVisits);
    if (localStorageVisits === null) {
        console.log('No saved Visits on Local Storage');
    } else {
        let parsedVisits = JSON.parse(localStorageVisits);
        console.log('Visits in local storage: ', parsedVisits);
        parsedVisits.forEach(function (savedVisit) {
            let restoredCard;
            switch (savedVisit._doctor) {
                case("кардиолог"):
                    savedVisit = new VisitToCardiologist(savedVisit._doctor, savedVisit._visitDate, savedVisit._fullname, savedVisit._visitTarget, savedVisit._visitId, savedVisit._pressure, savedVisit._weightIndex, savedVisit._age, savedVisit._illnesses, savedVisit._comments);
                    restoredCard = savedVisit.createNewCard();
                    document.querySelector('.board-container').appendChild(restoredCard);
                    savedVisit.showMore();

                    break;
                case("стоматолог"):
                    savedVisit = new VisitToDentist(savedVisit._doctor, savedVisit._visitDate, savedVisit._fullname, savedVisit._visitTarget, savedVisit._visitId, savedVisit._lastVisitDate);
                    restoredCard = savedVisit.createNewCard();
                    document.querySelector('.board-container').appendChild(restoredCard);
                    savedVisit.showMore();
                    break;
                case("терапевт"):
                    savedVisit = new VisitToTherapist(savedVisit._doctor, savedVisit._visitDate, savedVisit._fullname, savedVisit._visitTarget, savedVisit._visitId, savedVisit._age);
                    restoredCard = savedVisit.createNewCard();
                    document.querySelector('.board-container').appendChild(restoredCard);
                    savedVisit.showMore();
                    break;
            }

            addVisit(savedVisit);
            console.log(savedVisit);
            const closeCards = document.querySelectorAll('.close');
            closeCards.forEach((closeCard)=>
                closeCard.onclick = function(e){
                    removeVisit(e)
                }
            );
            checkVisits(visits);
        });

    }
}
function fieldsReset() {
    inputFields.forEach(function (element) {
        element.style.display = 'none';
    });
    switch (select.selectedIndex) {
        case(0):
            target.style.display = 'block';
            pressureValue.style.display = 'block';
            weighClient.style.display = 'block';
            illnessList.style.display = 'block';
            ageClient.style.display = 'block';
            visitorName.style.display = 'block';
            labelForNextVisit.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
        case(1):
            target.style.display = 'block';
            labelForLastVisit.style.display = 'block';
            lastVisit.style.display = 'block';
            visitorName.style.display = 'block';
            labelForNextVisit.style.display = 'block';
            nextVisit.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = ' inline-block';
            break;
        case(2):
            visitorName.style.display = 'block';
            labelForNextVisit.style.display = 'block';
            nextVisit.style.display = 'block';
            ageClient.style.display = 'block';
            target.style.display = 'block';
            comment.style.display = 'block';
            modalButton.style.display = 'inline-block';
            break;
    }
}
mainButton.addEventListener('click',function () {
    modalWindow.classList.add('active');
    fieldsReset();
});
select.addEventListener('change',function () {
    fieldsReset();
});
modalCrossButton.addEventListener ('click',function () {
    modalWindow.classList.remove('active')
});

modalButton.addEventListener('click', function (e) {
    e.preventDefault();
    let selectIndex = select.selectedIndex,
        doctor = select.options[selectIndex].value,
        visitDate = nextVisit.value,
        visitTarget = target.value,
        fullName = visitorName.value,
        illnesses = illnessList.value,
        lastVisitDate = lastVisit.value,
        age = ageClient.value,
        weightIndex = weighClient.value,
        pressure = pressureValue.value,
        commentText = comment.value,
        visitID = Date.now(),
        board = document.querySelector('.board-container'),
        newVisit,
        newCard;

    switch (selectIndex) {
        case(0):
            newVisit = new VisitToCardiologist(doctor, visitDate, fullName, visitTarget, visitID, pressure, weightIndex, age, illnesses, commentText);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();
            break;
        case(1):
            newVisit = new VisitToDentist(doctor, visitDate, fullName, visitTarget, visitID, lastVisitDate, commentText);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();
            break;
        case(2):
            newVisit = new VisitToTherapist(doctor, visitDate, fullName, visitTarget, visitID, age, commentText);
            newCard = newVisit.createNewCard();
            board.appendChild(newCard);
            newVisit.showMore();
            break;
    }

    addVisit(newVisit);
    newVisit.dragManager(dragStatus,shiftX,shiftY);
    console.log(newVisit);
    const closeCards = document.querySelectorAll('.close');
    closeCards.forEach((closeCard)=>
        closeCard.onclick = function(e){
        removeVisit(e)
    }
    );
    checkVisits(visits);
    modalWindow.reset();
    modalWindow.classList.remove('active');

    document.addEventListener('mousemove', function (event) {
        if (dragStatus) {
            newCard.style.left = event.clientX - shiftX + 'px';
            newCard.style.top = event.clientY - shiftY + 'px';
        }
    });
});
function removeVisit(e) {
    let visitingCardID = e.target.parentNode.parentNode.dataset.visitid;
    let visitObjToRemove= document.querySelector(`.visiting-card[data-visitid="${visitingCardID}"]`);
    let removeIndex = visits.findIndex((e)=>{
        return e.visitId === visitingCardID;

    });
    visits.splice(removeIndex, 1);
    checkVisits(visits);
    visitObjToRemove.remove();
}
window.addEventListener('beforeunload',()=>{
    pushVisitsToLocalStorage(visits);
});

