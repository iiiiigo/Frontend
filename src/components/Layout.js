import React from 'react';
import { Link } from 'react-router-dom';
import menu_bar from './icon/menubar_hamburger.png';
import close_bar from './icon/menubar_close.png';
import naver_logo from './icon/NAVER_D2_logo.png';

import './component.css';

export default function Layout({children}) {
    const handleClickMenu = () => {
        const x = document.getElementById('menu-img') || document.getElementById('close-img');
        const y = document.getElementById('open-button') || document.getElementById('close-button');
        if(x.src === menu_bar){
            x.src = close_bar;
            x.id = 'close-img'
            y.id = 'close-button';
        }else{
            x.src = menu_bar;
            x.id = 'menu-img'
            y.id = 'open-button';
        }
    }
  return (
    <span>
        <button type='button' id='open-button' onClick={handleClickMenu}>
            <img src={menu_bar} alt="menubar" id='menu-img'/>
        </button>
        <div id="link-div">
            <Link to={{pathname:'/'}} id='link'>
                <div id='naver_logo'>
                    <strong>다람쥐 컴퍼니</strong>
                </div>
                {/* <img src={naver_logo} alt="" id='naver_logo'/> */}
            </Link>
        </div>
        <ul id='menu-bar'>
            <li><Link to={{pathname:'/'}}>직원 리스트</Link></li>
            <li><Link to={{pathname:'/create'}}>신규 등록하기</Link></li>
        </ul>
        <body>
            {children}
        </body>
        <footer>
          <p>Copyright © NAVER Corp. All Rights Reserved.</p>
        </footer>
    </span>
  );
}
