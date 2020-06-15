// редактирование данных в одной персоне

function editBandit(i){
    display('create_person');
    document.getElementById('textFirstName').value = arrBandits[i].firstName;
    deleteBandit(i, arrBandits);
    document.getElementById('mainMenu').style.display = 'none';
}

function deleteBandit(i, arrBandits){
    arrBandits.splice(i, 1);
    printInfo(arrBandits);
}

//  Вывод всей информации на странице о выбранной персоне в id all_info

function printDefaultInfo(i){
    let form = document.getElementById('all_info').getElementsByTagName('form');
    //первый инпут в форме
    form[0].innerHTML = '<br>';
    form[0].innerHTML += 
    `<div class="deatailedInfo">
        <div class="details">
            <div class="elem">Имя</div>
        </div>
    </div>
    <input type="button" class="buttons" id="mainMenu2" value="Главное меню">`;
        
    document.getElementById('mainMenu2').addEventListener('click', function(){
        display('information');
    });
}

//отрисовка всей информации о персонах

function printInfo(arrBandits){
    let form = document.getElementById('information').getElementsByTagName('form');
    form[0].innerHTML = '<br>';
    // Первая (верхняя) строка таблицы
    form[0].innerHTML +=
        `<div class="text_description">
            <div class="text_name strong">Имя</div>
        </div>`;
    for(let i = 0; i < arrBandits.length; i++){
        // каждое i - информация о персоне
        form[0].innerHTML +=
        `<div class="text_description">
            <div class="text_name" id="details${i}"> ${arrBandits[i].firstName} </div>
            <div class="text_name" id="edit${i}">Редактировать</div>
            <div class="text_name" id="remove${i}">Удалить</div>
        </div>`;
    }
    form[0].innerHTML += '<br>' +
    '<input type="button" class="buttons" id="newBanditButton" value="Добавить нового бандита">';

    // добавить обработчики

    for(let i = 0; i < arrBandits.length; i++){
        let edit = `edit${i}`;
        let remove = `remove${i}`;
        let details = `details${i}`;
        document.getElementById(edit).style.color = 'blue';
        document.getElementById(remove).style.color = 'red';
        document.getElementById(details).style.color = 'green';

        document.getElementById(details).addEventListener('click', function(){
            printDefaultInfo(i, arrBandits);
            display('all_info');
        });

        document.getElementById(edit).addEventListener('click', function(){
            editBandit(i);
        });

        document.getElementById(remove).addEventListener('click', function(){
            if(confirm(`Точно удаляем информацию? о ${arrBandits[i].firstName}`)){
                deleteBandit(i, arrBandits);
            }
            else{

            }
        });
    }

    document.getElementById('newBanditButton').addEventListener('click', function(){
        display('create_person');
        document.getElementById('createPerson').style.display="";
    });
}

// Выбирать либо "information" либо "all_info" либо "create_person"
// display flex что бы отобразить нужный блок
function display(visibleId){
    switch(visibleId){
        case 'create_person':
        document.getElementById('information').style.display = 'none';
        document.getElementById('all_info').style.display = 'none';
        document.getElementById('create_person').style.display = 'flex';
        break;
        case 'all_info':
        document.getElementById('information').style.display = 'none';
        document.getElementById('all_info').style.display = 'flex';
        document.getElementById('create_person').style.display = 'none';
        break;
        case 'information':
        document.getElementById('information').style.display = 'flex';
        document.getElementById('all_info').style.display = 'none';
        document.getElementById('create_person').style.display = 'none';
        break;
    }
}

// Родительский класс с геттером и сеттером

class BaseClass{
    constructor(firstName){
        this.firstName = firstName;
    }

    get firstName(){
        return this._firstName;
    }

    set firstName(value){
        if(value.lenght == ''){
            alert('Введите Имя');
        }
        else{
            this._firstName = value;
        }
    }
}

// классы наследники

class OneExtendsClass extends BaseClass{
    constructor(firstName, type1, type2){
        super(firstName);
        this.type1 = type1;
        this.type2 = type2;
        this.type = 'killer';
    }

    // методы
}

class TwoExtendsClass extends BaseClass{
    constructor(firstName, type3, type4){
        super(firstName);
        this.type3 = type3;
        this.type4 = type4;
        this.type = 'sniper';
    }

    // методы
}

//  проверка на то какая радио-кнопка нажата и возвращаем его value

function checkRadio(){
    let radio = document.getElementsByClassName('radioOneExt');
    for(let i = 0; i < radio.length; i++){
        if(radio[i].checked){
            return (radio[i].value);
        }
    }
}

let arrBandits = []; //массив персон

let bandit1 = new OneExtendsClass('John', 12312, 12312);
arrBandits.push(bandit1);
let bandit2 = new TwoExtendsClass('John2', 12312, 12312);
arrBandits.push(bandit2);
let bandit3 = new OneExtendsClass('Tim', 12312, 12312);
arrBandits.push(bandit3);
display('information');
printInfo(arrBandits);

// главная страница готова
// с кнопками CRUD-операции

// listeners
// на главное меню

document.getElementById('createPerson').addEventListener('click', function(){
    document.getElementById('mainMenu').style.display = '';

    let firstName = document.getElementById('textFirstName').value;
    let type = checkRadio();

    switch(type){
        case 'killer':
            arrBandits[arrBandits.length] = new OneExtendsClass(firstName, /* 123, 123 */);
            printInfo(arrBandits);
            display('information');
            alert('Добавили нового');
        break;
        case 'sniper':
            arrBandits[arrBandits.length] = new TwoExtendsClass(firstName, /* 123, 123 */);
            printInfo(arrBandits);
            display('information');
            alert('Добавили нового');
        break;
        default:
            arrBandits[arrBandits.length] = new OneExtendsClass(firstName, /* 123, 123 */);
            printInfo(arrBandits);
            display('information');
            alert('Добавили нового');
        break;
    }
})

document.getElementById('mainMenu').addEventListener('click', function(){
    display('information');
});