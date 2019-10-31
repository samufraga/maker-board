/*
ENA=P8, IN1=P12, IN2=P16
ENB=P13, IN3=P14, IN4=P15
*/

enum MotorDirection {
    //% block="direto"
    Clockwise,
    //% block="inverso"
    CounterClockwise
}
enum MotorPick {
    //% block="A"
    MotorA,
    //% block='B'
    MotorB
}

//% color="#008800" weight=100 icon="\uf1ec" block="MAKER"
//% groups=['Motor Contínuo', 'Servo Motor']
namespace MakerBoard {
    //% block="ligar motor %motor"
    //% group='Motor CC'
    //% weight=0
    //% duration.shadow=timePicker
    //% speed.min=0 speed.max=60
    //% expandableArgumentMode="enabled"
    export function MotorOn(motor: MotorPick) {
        if(motor==MotorPick.MotorA){
            pins.digitalWritePin(DigitalPin.P0, 1)}
        else{pins.digitalWritePin(DigitalPin.P1, 1)}
    }

    //% block="parar motor %motor"
    //% group='Motor CC'
    //% weight=90
    //% duration.shadow=timePicker
    //% speed.min=0 speed.max=60 speed.defl=-1
    //% expandableArgumentMode="enabled"
    export function MotorOff(motor: MotorPick) {
        if (motor == MotorPick.MotorA) { pins.digitalWritePin(DigitalPin.P0, 0) }
        else { pins.digitalWritePin(DigitalPin.P1, 0) }
    }

    //% block="mudar velocidade do motor %motor para %velocidade"
    //% group='Motor CC'
    //% weight=50
    //% velocidade.min=0 velocidade.max=100
    export function setMotorSpeed(motor: MotorPick, velocidade: number, ) {

    }

    //% block="GIRAR motor %motor no sentido %direction||com velocidade %velocidade \\%"
    //% group='Motor CC'
    //% weight=100
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% velocidade.min=0 velocidade.max=100
    export function setMotorRotation(motor: MotorPick, direction: MotorDirection, velocidade: number=null) {
       
    }
    //% block="girar motor %motor sentido %direction || for %duration \\%ms"
    //% duration.shadow=timePicker
    //% expandableArgumentMode="toggle"
    export function runMotor(direction: MotorDirection, duration: number) {

    }
}