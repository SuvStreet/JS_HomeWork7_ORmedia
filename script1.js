let arrComputers = []; // массив всех компьтеров

// Родительский класс с геттером и сеттером
class BaseClass{
    constructor(type, year, processor, typeRam, os, typeRom, graphicsСard){
        this.type = type; // тип устройства
        this.year = year; // год выпуска
        this.processor = processor; // наименование процессора
        this.typeRam = typeRam; // объём оперативки
        this.os = os; // наличие операционной системы
        this.typeRom = typeRom; // тип запоминающего устройства
        this.graphicsСard = graphicsСard; // наименование видеокарты
    }

    /* get fullInformation(){
        return this.type,
        this.year,
        this.processor,
        this.typeRam,
        this.os,
        this.typeRom,
        this.graphicsСard;
    } */

    set typeDevice(type){
        this.type = type;
    }
    set addYear(year){
        this.year = year;
    }
    set addProcessor(processor){
        this.processor = processor;
    }
    set addTypeRam(typeRam){
        this.typeRam = typeRam;
    }
    set addOs(os){
        this.os = os;
    }
    set addTypeRom(typeRom){
        this.typeRom = typeRom;
    }
    set addGraphicsСard(graphicsСard){
        this.graphicsСard = graphicsСard;
    }
}

class Coputer extends BaseClass{
    constructor(type, year, processor, typeRam, os, typeRom, graphicsСard, powerSupply, monitor, keyboard){
        super(type, year, processor, typeRam, os, typeRom, graphicsСard);
        this.powerSupply = powerSupply;
        this.monitor = monitor;
        this.keyboard = keyboard;
    }

    /* set typeDevice(type){
        super.typeDevice(type);
    } */
    set addPowerSupply(powerSupply){
        this.powerSupply = powerSupply;
    }
    set addMonitor(monitor){
        this.monitor = monitor;
    }
    set addKeyboard(keyboard){
        this.keyboard = keyboard;
    }

}

class Laptop extends BaseClass{
    constructor(type, year, processor, typeRam, os, typeRom, graphicsСard, brend, screenMatrix, diagonal){
        super(type, year, processor, typeRam, os, typeRom, graphicsСard);
        this.brend = brend;
        this.screenMatrix = screenMatrix;
        this.diagonal = diagonal;
    }

    set addBrend(brend){
        this.brend = brend;
    }
    set addScreenMatrix(screenMatrix){
        this.screenMatrix = screenMatrix;
    }
    set addDiagonal(diagonal){
        this.diagonal = diagonal;
    }
}

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
    let form = document.getElementById('information').getElementsByTagName('form');
    form[0].innerHTML = '<br>';
    // Первая (верхняя) строка таблицы
    form[0].innerHTML +=
        `<div class="text_description">
            <div class="year">Тип устройства</div>
            <div class="processor">Название процессора</div>
            <div class="os">Наличие операционной системы</div>
            <div class="to_do">Действие</div>
        </div>`;
    for(let i = 0; i < arrComputers.length; i++){
        // каждое i - информация о компьютере
        form[0].innerHTML +=
        `<div class="info_text_description">
            <div class="type" id="type${i}"> ${arrComputers[i].type} </div>
            <div class="processor" id="processor${i}"> ${arrComputers[i].processor} </div>
            <div class="os" id="os${i}"> ${arrComputers[i].os} </div>
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
        document.getElementById('createComputer').style.display="";
    });
}

// редактирование данных компьютера

function editComputer(i){
    display('create_сomputer');

    document.getElementById('device').value = arrComputers[i].type;
    document.getElementById('year').value = arrComputers[i].year;
    document.getElementById('processor').value = arrComputers[i].processor;
    document.getElementById('typeRam').value = arrComputers[i].typeRam;
    arrComputers[i].os = checkedBtnOs();
    document.getElementById('typeRom').value = arrComputers[i].typeRom;
    document.getElementById('graphicsСard').value = arrComputers[i].graphicsСard;

    document.getElementById('powerSupply').value = arrComputers[i].powerSupply;
    arrComputers[i].monitor = checkedBtnMonitor();
    arrComputers[i].keyboard = checkedBtnKeyboard();

    document.getElementById('brend').value = arrComputers[i].brend;
    document.getElementById('screenMatrix').value = arrComputers[i].screenMatrix;
    document.getElementById('diagonal').value = arrComputers[i].diagonal;

    /* document.getElementById('createComputer').style.display = 'none';
    document.getElementById('editComputer').style.display = 'block'; */

    document.getElementById('editComputer').addEventListener('click', function(){
        deleteComputer(i, arrComputers);
        display('information');
    });
}

function deleteComputer(i, arrComputers){
    arrComputers.splice(i, [arrComputers.length - 1]);
    printInfo(arrComputers);

    /* document.getElementById('createComputer').style.display = 'block';
    document.getElementById('editComputer').style.display = 'none'; */
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
            <div class="processor">Название процессора</div>
            <div class="os">Наличие операционной системы</div>
            <div class="typeRam">Тип ОЗУ</div>
            <div class="typeRom">Тип ПЗУ</div>
            <div class="graphicsСard">Видеокарта</div>
            <div class="powerSupply">Блок питания</div>
            <div class="monitor">Монитор</div>
            <div class="keyboard">Клавиатура</div>
        </div>` 
    }
    else {
        form[0].innerHTML +=
        `<div class="text_description">
            <div class="type">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="processor">Название процессора</div>
            <div class="os">Наличие операционной системы</div>
            <div class="typeRam">Тип ОЗУ</div>
            <div class="typeRom">Тип ПЗУ</div>
            <div class="graphicsСard">Видеокарта</div>
            <div class="brend">Бренд</div>
            <div class="screenMatrix">Тип матрицы</div>
            <div class="diagonal">Диагональ экрана</div>
        </div>`
    }

    form[0].innerHTML +=
    `<div class="info_text_description">
        <div class="type" id="type${i}"> ${arrComputers[i].type} </div>
        <div class="year" id="year${i}"> ${arrComputers[i].year} </div>
        <div class="processor" id="processor${i}"> ${arrComputers[i].processor} </div>
        <div class="os" id="os${i}"> ${arrComputers[i].os} </div>
        <div class="typeRam" id="typeRam${i}"> ${arrComputers[i].typeRam} </div>
        <div class="typeRom" id="typeRom${i}"> ${arrComputers[i].typeRom} </div>
        <div class="graphicsСard" id="graphicsСard${i}"> ${arrComputers[i].graphicsСard} </div>
        <div class="powerSupply" id="powerSupply${i}"> ${arrComputers[i].powerSupply} </div>
        <div class="monitor" id="monitor${i}"> ${arrComputers[i].monitor} </div>
        <div class="keyboard" id="keyboard${i}"> ${arrComputers[i].keyboard} </div>
    </div>`;

    form[0].innerHTML += '<br>' +
    `<input type="button" class="buttons" id="mainMenu2" value="Главное меню">`;
        
    document.getElementById('mainMenu2').addEventListener('click', function(){
        display('information');
    });
}

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

function checkedBtnOs(){
    if(document.getElementById('os_true').checked){
        return document.getElementById('os_true').value;
    }
    else{
        return document.getElementById('os_false').value;
    }
}

function checkedBtnMonitor(){
    if(document.getElementById('monitor_true').checked){
        return document.getElementById('monitor_true').value;
    }
    else{
        return document.getElementById('monitor_false').value;
    }
}

function checkedBtnKeyboard(){
    if(document.getElementById('keyboard_true').checked){
        return document.getElementById('keyboard_true').value;
    }
    else{
        return document.getElementById('keyboard_false').value;
    }
}

document.getElementById('createComputer').addEventListener('click', function(){
    
    let device = document.getElementById('device').value;
    let year = document.getElementById('year').value;
    let processor = document.getElementById('processor').value;
    let typeRam = document.getElementById('typeRam').value;
    let os = checkedBtnOs();
    let typeRom = document.getElementById('typeRom').value;
    let graphicsСard = document.getElementById('graphicsСard').value;

    let powerSupply = document.getElementById('powerSupply').value;
    let monitor = checkedBtnMonitor();
    let keyboard = checkedBtnKeyboard();

    let brend = document.getElementById('brend').value;
    let screenMatrix = document.getElementById('screenMatrix').value;
    let diagonal = document.getElementById('diagonal').value;

    switch(device){
        case 'pc':
            arrComputers[arrComputers.length] = new Coputer(device, year, processor, typeRam, os,
                typeRom, graphicsСard, powerSupply, monitor, keyboard);
            
            /* let computer = new Coputer();
            computer.typeDevice(device);
            computer.addYear(year);
            computer.addProcessor(processor);
            computer.addTypeRam(typeRam);
            computer.addOs(os);
            computer.addTypeRom(typeRom);
            computer.addGraphicsСard(graphicsСard);

            computer.addPowerSupply(powerSupply);
            computer.addMonitor(monitor);
            computer.addKeyboard(keyboard);

            arrComputers.push = computer; */

            display('information');
            printInfo(arrComputers);
            alert('Добавили новое устройство');
        break;
        case 'laptop':
            arrComputers[arrComputers.length] = new Coputer(device, year, processor, typeRam, os,
                typeRom, graphicsСard, brend, screenMatrix, diagonal);

            /* let laptop = new Coputer();
            laptop.typeDevice(device);
            laptop.addYear(year);
            laptop.addProcessor(processor);
            laptop.addTypeRam(typeRam);
            laptop.addOs(os);
            laptop.addTypeRom(typeRom);
            laptop.addGraphicsСard(graphicsСard);

            laptop.addBrend(brend);
            laptop.addScreenMatrix(screenMatrix);
            laptop.addDiagonal(diagonal);

            arrComputers.push = laptop; */

            display('information');
            printInfo(arrComputers);
            alert('Добавили новое устройство');
        break;
    }
})

document.getElementById('mainMenu').addEventListener('click', function(){
    display('information');
});

