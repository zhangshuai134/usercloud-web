#!/bin/bash
shopt -s extglob
COMPONENT_NAME=$1

function Log(){
    dateFormat=`date "+%Y-%m-%d %H:%M:%S"`
    level="INFO"
    messageShow="message is null"
    if [[ $1 != "" ]];then
        typeset -u level=$1
    fi
    if [[ $2 != "" ]];then
        messageShow=$2
    fi
    printf "[%s] %s %s\n" "$level" "$dateFormat" "$messageShow"
}
function isError(){
  if [ $? -ne 0 ];then
      Log ERROR "Compilation failed, request the developer to confirm it."
    exit 1
  fi
}

function eslint_build(){
    Log INFO "Start eslint build ..."
    Log INFO "ESLINT RULES : http://eslint.cn/docs/rules/"
    Log INFO "eslint --no-eslintrc --ext .vue,.js src -c build-tools/eslintrc.json . -o eslint.xml -f checkstyle"
    eslint --no-eslintrc --ext .vue,.js src -c build-tools/eslintrc.json . -o eslint.xml -f checkstyle
    #isError
} 

eslint_build
