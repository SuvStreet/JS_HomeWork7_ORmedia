let arrComputers = []; // массив всех компьтеров
let computer; // хранит компьютеры
let laptop; // хранит ноутбуки

// Родительский класс с геттером и сеттером
class BaseClass{
    constructor(type, year){
        this.type = type; // тип устройства
        this.year = year; // год выпуска
    }

    set typeDevice(newType){
        this.type = newType;
    }
    get typeDevice(){
        return this.type;
    }

    set addYear(newYear){
        this.year = newYear;
    }
    get addYear(){
        return this.year;
    }
}

class Computer extends BaseClass{
    constructor(type, year, monitor){
        super(type, year);
        this.monitor = monitor;
    }

    set addMonitor(newMonitor){
        this.monitor = newMonitor;
    }
    get addMonitor(){
        return this.monitor;
    }
}

class Laptop extends BaseClass{
    constructor(type, year, brend){
        super(type, year);
        this.brend = brend;
    }

    set addBrend(newBrend){
        this.brend = newBrend;
    }
    get addBrend(){
        return this.brend;
    } 
}

document.addEventListener("DOMContentLoaded", display('create_сomputer'));

// Выбирать либо "information" либо "all_info" либо "create_person"
// display block что бы отобразить нужный блок
function display(visibleId){
    switch(visibleId){
        case 'create_сomputer':
        document.getElementById('information').style.display = 'none';
        document.getElementById('all_info').style.display = 'none';
        document.getElementById('create_сomputer').style.display = 'block';
        break;
        case 'all_info':
        document.getElementById('information').style.display = 'none';
        document.getElementById('all_info').style.display = 'block';
        document.getElementById('create_сomputer').style.display = 'none';
        break;
        case 'information':
        document.getElementById('information').style.display = 'block';
        document.getElementById('all_info').style.display = 'none';
        document.getElementById('create_сomputer').style.display = 'none';
        break;
    }
}

//отрисовка всей информации о компьютерах, главная страница
function printInfo(arrComputers){
    /* console.log(arrComputers); */
    let form = document.getElementById('information').getElementsByTagName('form');
    form[0].innerHTML = '<br>';
    // Первая (верхняя) строка таблицы
    form[0].innerHTML +=
        `<div class="text_description">
            <div class="type">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="to_do">Действие</div>
        </div>`;
    for(let i = 0; i < arrComputers.length; i++){
        // каждое i - информация о компьютере
        form[0].innerHTML +=
        `<div class="info_text_description">
            <div class="type" id="type${i}"> ${arrComputers[i].type} </div>
            <div class="year" id="year${i}"> ${arrComputers[i].year} </div>
            <div class="btn_toDo">
                <div class="edit" id="edit${i}">Редактировать</div>
                <div class="remove" id="remove${i}">Удалить</div>
            </div>
        </div>`;
    }
    form[0].innerHTML += '<br>' +
    '<input type="button" class="buttons" id="newComputerButton" value="Добавить новый компьютер">';

    // добавить обработчики
    for(let i = 0; i < arrComputers.length; i++){
        let type = `type${i}`;
        let edit = `edit${i}`;
        let remove = `remove${i}`;
        
        document.getElementById(type).style.color = 'green';
        document.getElementById(edit).style.color = 'blue';
        document.getElementById(remove).style.color = 'red';
        
        document.getElementById(type).addEventListener('click', function(){
            printSelectInfo(i, arrComputers);
            display('all_info');
        });

        document.getElementById(edit).addEventListener('click', function(){
            editComputer(i);
        });

        document.getElementById(remove).addEventListener('click', function(){
            if(confirm(`Точно удаляем информацию? о ${arrComputers[i].type}`)){
                deleteComputer(i, arrComputers);
            }
            else{

            }
        });
    }

    document.getElementById('newComputerButton').addEventListener('click', function(){
        display('create_сomputer');
        /* document.getElementById('createComputer').style.display=""; */
    });
}

// редактирование устройства
function editComputer(i){
    /* console.log(i); */
    display('create_сomputer');

    document.getElementById('createComputer').style.display = 'none';
    document.getElementById('editComputer').style.display = 'block'; 

    document.getElementById('device').value = arrComputers[i].type;
    document.getElementById('year').value = arrComputers[i].year;
    arrComputers[i].monitor = checkedBtnMonitor();

    

    /* computer.typeDevice(document.getElementById('device').value) */
    
    /* arrComputers[i].typeDevice(document.getElementById('device').value); */
    /* arrComputers[i].addYear(document.getElementById('year').value); */

    /* arrComputers[i].addMonitor(checkedBtnMonitor()); */

    /* arrComputers[i].addBrend(document.getElementById('brend').value);*/

    /* deleteComputer(i, arrComputers); */

    document.getElementById('editComputer').addEventListener('click', function(){
    
    let device = document.getElementById('device').value;
    let year = document.getElementById('year').value;
    let monitor = checkedBtnMonitor();

    /* computer.typeDevice(device); */
    computer.addYear = year;
    /* computer.addMonitor(monitor);
 */
    /* deleteComputer(i, arrComputers); */
    printInfo(arrComputers);
    display('information');

    document.getElementById('createComputer').style.display = 'block';
    document.getElementById('editComputer').style.display = 'none';
    });
}

// удаление устройства
function deleteComputer(i, arrComputers){
    arrComputers.splice(i, 1);
    printInfo(arrComputers);

    /* document.getElementById('createComputer').style.display = 'block'; */
    /* document.getElementById('editComputer').style.display = 'none'; */
}

//  Вывод всей информации на странице о выбранном устройстве
function printSelectInfo(i, arrComputers){
    let form = document.getElementById('all_info').getElementsByTagName('form');
    //первый инпут в форме
    form[0].innerHTML = '<br>';
    if(arrComputers[i].type == 'pc'){
       form[0].innerHTML +=
       `<div class="text_description">
            <div class="type">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="monitor">Монитор</div>
        </div>`;
        form[0].innerHTML +=
        `<div class="info_text_description">
            <div class="type" id="type${i}"> ${arrComputers[i].type} </div>
            <div class="year" id="year${i}"> ${arrComputers[i].year} </div>
            <div class="monitor" id="monitor${i}"> ${arrComputers[i].monitor} </div>
        </div>`;
    }
    else {
        form[0].innerHTML +=
        `<div class="text_description">
            <div class="type">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="brend">Бренд</div>
        </div>`;
        form[0].innerHTML +=
        `<div class="info_text_description">
            <div class="type" id="type${i}"> ${arrComputers[i].type} </div>
            <div class="year" id="year${i}"> ${arrComputers[i].year} </div>
            <div class="monitor" id="brend${i}"> ${arrComputers[i].brend} </div>
        </div>`;
    }

    form[0].innerHTML += '<br>' +
    `<input type="button" class="buttons" id="mainMenu2" value="Главное меню">`;
        
    document.getElementById('mainMenu2').addEventListener('click', function(){
        display('information');
    });
}


/* document.addEventListener("DOMContentLoaded", checkedTypeDevice('pc')); */
/* document.addEventListener('click', checkedTypeDevice(device)); */

document.getElementById('device').addEventListener('click', function(){
    let device = document.getElementById('device').value;
    switch(device){
        case 'pc':
            document.getElementById('form_computer').style.display = 'block';
            document.getElementById('form_laptop').style.display = 'none';
        break;
        case 'laptop':
            document.getElementById('form_computer').style.display = 'none';
            document.getElementById('form_laptop').style.display = 'block';
        break;
    }
})

// есть или нету монитора
function checkedBtnMonitor(){
    if(document.getElementById('monitor_true').checked){
        return document.getElementById('monitor_true').value;
    }
    else{
        return document.getElementById('monitor_false').value;
    }
}

document.getElementById('createComputer').addEventListener('click', function(){
    
    let device = document.getElementById('device').value;
    let year = document.getElementById('year').value;

    switch(device){
        case 'pc':
            let monitor = checkedBtnMonitor();

            /* arrComputers[arrComputers.length] = new Computer(device, year, monitor); */
            
            computer = new BaseClass(device, year);

            /*computer.addProcessor(processor);
            computer.addTypeRam(typeRam);
            computer.addOs(os);
            computer.addTypeRom(typeRom);
            computer.addGraphicsСard(graphicsСard);

            computer.addPowerSupply(powerSupply);
            
            computer.addKeyboard(keyboard);*/

            arrComputers.push(computer);

            /* arrComputers[arrComputers.length] = computer; */
            /* console.log(computer);
            console.log(typeof(computer));
            console.log(arrComputers.length);
            console.log(arrComputers[arrComputers.length - 1].year); */

            display('information');
            printInfo(arrComputers); 
            alert('Добавили новое устройство');
        break;
        case 'laptop':
            let brend = document.getElementById('brend').value;

            arrComputers[arrComputers.length] = new Laptop(device, year, brend);

            /* laptop = new Laptop(device, year, brend); */

            /* let laptop = new Laptop();
            laptop.typeDevice(device);
            laptop.addYear(year);
            laptop.addProcessor(processor);
            laptop.addTypeRam(typeRam);
            laptop.addOs(os);
            laptop.addTypeRom(typeRom);
            laptop.addGraphicsСard(graphicsСard);

            laptop.addBrend(brend);
            laptop.addScreenMatrix(screenMatrix);
            laptop.addDiagonal(diagonal);*/

            /* arrComputers.push = laptop; */

            display('information');
            printInfo(arrComputers);
            alert('Добавили новое устройство');
        break;
    }
})

document.getElementById('mainMenu').addEventListener('click', function(){
    display('information');
});