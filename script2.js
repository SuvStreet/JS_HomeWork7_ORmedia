let arrComputers = []; // массив всех компьтеров
let allDevice; // хранит компьютеры, ноутбуки

document.addEventListener("DOMContentLoaded", ()=>{
    if (localStorage.key('saveArr') === 'saveArr'){
        let x = JSON.parse(localStorage.getItem('saveArr'));
        for(let i = 0; i < x.length; i++){
            if (x[i].typeDevice === 'pc'){
                allDevice = new Computer(x[i].typeDevice, x[i].year, x[i].processor, x[i].typeRam, x[i].os,
                    x[i].typeRom, x[i].graphicsСard, x[i].powerSupply, x[i].monitor, x[i].keyboard);
                arrComputers.push(allDevice);
            }
            else {
                allDevice = new Laptop(x[i].typeDevice, x[i].year, x[i].processor, x[i].typeRam, x[i].os,
                    x[i].typeRom, x[i].graphicsСard, x[i].brend, x[i].screenMatrix, x[i].diagonal);
                arrComputers.push(allDevice);
            }
        }
    }
    display('information');
    printInfo(arrComputers);
});

// Выбирать либо "information" либо "all_info" либо "create_сomputer"
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
    };
};

//отрисовка всей информации о компьютерах, главная страница
function printInfo(arrComputers){
    let form = document.getElementById('information').getElementsByTagName('form');

    console.log(arrComputers); 

    if(arrComputers.length === 0){
        form[0].innerHTML =
        `<br/><div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="os">Наличие операционной системы</div>
            <div class="to_do">Действие</div>
        </div>`;
        form[0].innerHTML += 
        `<div>
            <h2>Тут пока пусто!</h2>
        </div>`;
        form[0].innerHTML += `<input type="button" class="newComputerButton" id="newComputerButton" value="Добавить новое устройство">`;

        document.getElementById('newComputerButton').addEventListener('click', function(){
            display('create_сomputer');
            clearInput();
        });
    } 
    else {
        form[0].innerHTML =
        `<br/><div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="os">Наличие операционной системы</div>
            <div class="to_do">Действие</div>
        </div>`;
        for(let i = 0; i < arrComputers.length; i++){
        // каждое i - информация о компьютере
        form[0].innerHTML +=
        `<div class="info_text_description">
            <div class="typeDevice" id="typeDevice${i}"> ${arrComputers[i].addTypeDevice} </div>
            <div class="year" id="year${i}"> ${arrComputers[i].addYear} </div>
            <div class="os" id="os${i}"> ${arrComputers[i].addOs === 'true' ? 'есть' : 'нету'} </div>
            <div class="btn_toDo">
                <div class="edit" id="edit${i}">Редактировать</div>
                <div class="remove" id="remove${i}">Удалить</div>
            </div>
        </div>`;
    };
    form[0].innerHTML += `<br/><input type="button" class="buttons" id="newComputerButton" value="Добавить новое устройство">`;

    // добавить обработчики
    for(let i = 0; i < arrComputers.length; i++){
        let typeDevice = `typeDevice${i}`;
        let edit = `edit${i}`;
        let remove = `remove${i}`;
        
        document.getElementById(typeDevice).style.color = 'green';
        document.getElementById(edit).style.color = 'blue';
        document.getElementById(remove).style.color = 'red';
        
        document.getElementById(typeDevice).addEventListener('click', function(){
            printSelectInfo(i, arrComputers);
        });

        document.getElementById(edit).addEventListener('click', function(){
            editComputer(i);
        });

        document.getElementById(remove).addEventListener('click', function(){
            deleteComputer(i, arrComputers);
        });
    };

    document.getElementById('newComputerButton').addEventListener('click', function(){
        display('create_сomputer');

        document.getElementById('createComputer').style.display = 'block';
        document.getElementById('editComputer').style.display = 'none';
        document.getElementById('fromGroupTypeDevice').style.display = 'block';

        clearInput();
    });
    } 
};

// редактирование устройства
function editComputer(i){
    display('create_сomputer');

    document.getElementById('createComputer').style.display = 'none';
    document.getElementById('editComputer').style.display = 'block';
    document.getElementById('fromGroupTypeDevice').style.display = 'none';

    document.getElementById('year').value = arrComputers[i].addYear;
    document.getElementById('processor').value = arrComputers[i].addProcessor;
    document.getElementById('typeRam').value = arrComputers[i].addTypeRam;
    arrComputers[i].addOs = checkedBtnOS();
    document.getElementById('typeRom').value = arrComputers[i].addTypeRom;
    document.getElementById('graphicsСard').value = arrComputers[i].addGraphicsСard;
    
    switch(arrComputers[i].addTypeDevice){
        case 'pc':
            selectDevice('pc');
            document.getElementById('powerSupply').value = arrComputers[i].addPowerSupply;
            arrComputers[i].addMonitor = checkedBtnMonitor();
            arrComputers[i].addKeyboard = checkedBtnKeyboard();
        break;
        case 'laptop':
            selectDevice('laptop');
            document.getElementById('brend').value = arrComputers[i].addBrend;
            document.getElementById('screenMatrix').value = arrComputers[i].addScreenMatrix;
            document.getElementById('diagonal').value = arrComputers[i].addDiagonal;
        break;
    };

    document.getElementById('editComputer').addEventListener('click', function(){   
        if(emptiness(arrComputers[i].typeDevice) === true){

            /* console.log(arrComputers[i].typeDevice); */

            arrComputers[i].addYear = document.getElementById('year').value;
            arrComputers[i].addProcessor = document.getElementById('processor').value;
            arrComputers[i].addTypeRam = document.getElementById('typeRam').value;
            arrComputers[i].addOs = checkedBtnOS();
            arrComputers[i].addTypeRom = document.getElementById('typeRom').value;
            arrComputers[i].addGraphicsСard = document.getElementById('graphicsСard').value;
                    
            if(arrComputers[i].addTypeDevice === 'pc'){
                arrComputers[i].addPowerSupply = document.getElementById('powerSupply').value;
                arrComputers[i].addMonitor = checkedBtnMonitor();
                arrComputers[i].addKeyboard = checkedBtnKeyboard();
            }
            else {
                arrComputers[i].addBrend = document.getElementById('brend').value;
                arrComputers[i].addScreenMatrix = document.getElementById('screenMatrix').value;
                arrComputers[i].addDiagonal = document.getElementById('diagonal').value;
            };

            printInfo(arrComputers); // выводим свежую информацию
            display('information'); // возвращаемся на главную страницу

            document.getElementById('createComputer').style.display = 'block';
            document.getElementById('editComputer').style.display = 'none';
            document.getElementById('fromGroupTypeDevice').style.display = 'block';

            // записываем изменения в localStorage
            localStorage.setItem('saveArr', JSON.stringify(arrComputers));
        }
    });
};

// удаление устройства
function deleteComputer(i, arrComputers){
    if(confirm(`Точно удаляем информацию о ${arrComputers[i].addTypeDevice}, за ${arrComputers[i].addYear} год?`)){
        arrComputers.splice(i, 1);

        // сохраняем изменения
        localStorage.setItem('saveArr', JSON.stringify(arrComputers));
        printInfo(arrComputers);
    };
};

//  Вывод всей информации на странице о выбранном устройстве
function printSelectInfo(i, arrComputers){
    display('all_info');

    let form = document.getElementById('all_info').getElementsByTagName('form');

    if(arrComputers[i].addTypeDevice === 'pc'){
        
        /* let div1 = document.createElement('div');
        div1.className = 'powerSupply';
        div1.innerHTML = `Мощность блока питания`;
        document.getElementById('end').after(div1);

        let div2 = document.createElement('div');
        div2.className = 'monitor';
        div2.innerHTML = `Наличие монитора`;
        document.getElementById('end2').after(div2);

        let div3 = document.createElement('div');
        div3.className = 'keyboard';
        div3.innerHTML = `Наличие клавиатуры`;
        document.getElementById('end').after(div3); */

       form[0].innerHTML =
        `<br/><div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="processor">Название процессора</div>
            <div class="typeRam">Тип ОЗУ</div>
            <div class="os">Наличие ОС</div>
            <div class="typeRom">Тип ПЗУ</div>
            <div class="graphicsСard">Графическая карта</div>
            <div class="powerSupply">Мощность блока питания</div>
            <div class="monitor">Наличие монитора</div>
            <div class="keyboard">Наличие клавиатуры</div>
        </div>`;
        form[0].innerHTML +=
        `<div class="info_text_description">
            <div class="typeDevice" id="typeDevice${i}">${arrComputers[i].addTypeDevice}</div>
            <div class="year" id="year${i}">${arrComputers[i].addYear}</div>
            <div class="processor" id="processor${i}">${arrComputers[i].addProcessor}</div>
            <div class="typeRam" id="typeRam${i}">${arrComputers[i].addTypeRam}</div>
            <div class="os" id="os${i}">${arrComputers[i].addOs === 'true' ? 'есть' : 'нету'}</div>
            <div class="typeRom" id="typeRom${i}">${arrComputers[i].addTypeRom}</div>
            <div class="graphicsСard" id="graphicsСard${i}">${arrComputers[i].addGraphicsСard}</div>
            <div class="powerSupply" id="powerSupply${i}">${arrComputers[i].addPowerSupply} W</div>
            <div class="monitor" id="monitor${i}">${arrComputers[i].addMonitor === 'true' ? 'есть' : 'нету'}</div>
            <div class="keyboard" id="keyboard${i}">${arrComputers[i].addKeyboard === 'true' ? 'есть' : 'нету'}</div>
        </div>`;
    }
    else {
        form[0].innerHTML =
        `<br/><div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="processor">Название процессора</div>
            <div class="typeRam">Тип ОЗУ</div>
            <div class="os">Наличие ОС</div>
            <div class="typeRom">Тип ПЗУ</div>
            <div class="graphicsСard">Графическая карта</div>
            <div class="brend">Наименование бренда</div>
            <div class="screenMatrix">Тип матрицы</div>
            <div class="diagonal">Диагональ экрана</div>
        </div>`;
        form[0].innerHTML +=
        `<div class="info_text_description">
            <div class="typeDevice" id="typeDevice${i}">${arrComputers[i].addTypeDevice}</div>
            <div class="year" id="year${i}">${arrComputers[i].addYear}</div>
            <div class="processor" id="processor${i}">${arrComputers[i].addProcessor}</div>
            <div class="typeRam" id="typeRam${i}">${arrComputers[i].addTypeRam}</div>
            <div class="os" id="os${i}">${arrComputers[i].addOs === 'true' ? 'есть' : 'нету'}</div>
            <div class="typeRom" id="typeRom${i}">${arrComputers[i].addTypeRom}</div>
            <div class="graphicsСard" id="graphicsСard${i}">${arrComputers[i].addGraphicsСard}</div>
            <div class="brend" id="brend${i}">${arrComputers[i].addBrend}</div>
            <div class="screenMatrix" id="screenMatrix${i}">${arrComputers[i].addScreenMatrix}</div>
            <div class="diagonal" id="diagonal${i}">${arrComputers[i].addDiagonal}</div>
        </div>`;
    };

    form[0].innerHTML += '<br>' +
    `<input type="button" class="buttons" id="mainMenu2" value="Главное меню">`;
        
    document.getElementById('mainMenu2').addEventListener('click', function(){
        display('information');
    });
};

// вызов функции selectDevice(device){}
document.getElementById('device').addEventListener('click', function(){
    selectDevice(document.getElementById('device').value);
});

// вывод доп. информации либо компьютер, либо ноутбук
function selectDevice(device){
    switch(device){
        case 'pc':
            document.getElementById('device').value = 'pc';
            document.getElementById('form_computer').style.display = 'block';
            document.getElementById('form_laptop').style.display = 'none';
        break;
        case 'laptop':
            document.getElementById('device').value = 'laptop';
            document.getElementById('form_computer').style.display = 'none';
            document.getElementById('form_laptop').style.display = 'block';
        break;
    };
}

// есть или нету монитора
function checkedBtnMonitor(){
    if(document.getElementById('monitor_true').checked){
        return document.getElementById('monitor_true').value;
    }
    else{
        return document.getElementById('monitor_false').value;
    }
}

// есть или нету клавиатуры
function checkedBtnKeyboard(){
    if(document.getElementById('keyboard_true').checked){
        return document.getElementById('keyboard_true').value;
    }
    else{
        return document.getElementById('keyboard_false').value;
    }
}

// проверка на пустоту
function emptiness(type){
    switch(type){
        case 'pc':
            if(document.getElementById('powerSupply').value.trim() === "" || document.getElementById('year').value === ""){
                alert('Заполните все поля!');
            }
            else{
                return true;
            }
        break;
        case 'laptop':
            if(document.getElementById('year').value === "" || document.getElementById('diagonal').value === ""){
                alert('Заполните все поля!');
            }
            else{
                return true;
            }
        break;
    }
}


// есть или нету OS
function checkedBtnOS(){
    if(document.getElementById('os_true').checked){
        return document.getElementById('os_true').value;
    }
    else{
        return document.getElementById('os_false').value;
    }
}

// очистка Input
function clearInput(){
    document.getElementById('year').value = '';
    document.getElementById('powerSupply').value = '';
    document.getElementById('diagonal').value = '';
};

// нажатие кнопки на странице добавление нового устройства
document.getElementById('createComputer').addEventListener('click', function(){
    let device = document.getElementById('device').value;
    let year = document.getElementById('year').value;
    let processor = document.getElementById('processor').value;
    let typeRam = document.getElementById('typeRam').value;
    let os = checkedBtnOS();
    let typeRom = document.getElementById('typeRom').value;
    let graphicsСard = document.getElementById('graphicsСard').value;

    if (emptiness(device) === true){
        switch(device){
            case 'pc':
                let powerSupply = document.getElementById('powerSupply').value;
                let monitor = checkedBtnMonitor();
                let keyboard = checkedBtnKeyboard();
    
                allDevice = new Computer(device, year, processor, typeRam, os, typeRom, graphicsСard, powerSupply, monitor, keyboard);
                arrComputers.push(allDevice);
                printInfo(arrComputers);
                display('information');
                alert('Добавили новое устройство');
    
                localStorage.setItem('saveArr', JSON.stringify(arrComputers));
            break;
            case 'laptop':
                let brend = document.getElementById('brend').value;
                let screenMatrix = document.getElementById('screenMatrix').value;
                let diagonal = document.getElementById('diagonal').value;
    
                allDevice = new Laptop(device, year, processor, typeRam, os, typeRom, graphicsСard, brend, screenMatrix, diagonal);
                arrComputers.push(allDevice);
                printInfo(arrComputers);
                display('information');
                alert('Добавили новое устройство');
    
                localStorage.setItem('saveArr', JSON.stringify(arrComputers));
            break;
        };
    }
});

// нажатие кнопки главный экран
document.getElementById('mainMenu').addEventListener('click', function(){
    display('information');
});