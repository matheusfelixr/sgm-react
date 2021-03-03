import styled from 'styled-components'

export const LoginContainer = styled.div`
    background-image : url('https://i.picsum.photos/id/411/1280/610.jpg?hmac=q43Wwz9jhxPhVC7rE4OhMPiNyjWw82dHXgwpgDSsF2s') ;
    width : 100%;
    height : 100%;
    position : relative;
    background-color: #313431;

    .LoginContainerTextClick:hover{
            color : #c5c1c1;
        }
`
export const LoginTitle = styled.h2`
`

export const LoginInfoError = styled.span`

`


export const LoginContainerForm = styled.div`
    padding-top: 10px;
    width: 330px;
    
`

export const LoginPanel = styled.div`
    background-color : #005b95cc;
    width : 400px;
    height : 100%;
    position : absolute;
    right : 0;
    display : flex;
    align-items : center;
    justify-content : center;
    padding: 10px;
    color: #FFFFFF;


    @media (max-width: 600px) {
        width : 100%;
    }

    form{

        input{
            padding : 5px 10px;
            width: 100%;
            margin-bottom: 10px;
            border : 0;
            border-radius : 4px;
            font-size : 14px;
        }

        .button-login{
            width : 100%;
            padding : 7px;
            border-radius : 4px;
            border : 0;
            color : white;
            background-color : #2d6c4c;
        }

        .button-login:hover{
            color : #c5c1c1;
            background-color : #276143;
        }

        .alert-danger{
            margin-top:10px;
        }

        .invalid-feedback{
            color:white;
            font-size: medium;
            font-weight: lighter;
        }

        .LoginContainerTextClick{
            display:flex;
            padding-top: 10px;
            font-size: 15px;
            right: 1px;
            cursor: pointer;
        }

    }
`
