import React from 'react';
import "./css/footer.style.css"
import Logo1 from "../../Shares/assets/logo/footer/1.png"
import Logo2 from "../../Shares/assets/logo/footer/2.png"
import Logo3 from "../../Shares/assets/logo/footer/3.png"
import Logo4 from "../../Shares/assets/logo/footer/4.png"
import IconFooterComp from '../../Composant/iconFooter/iconFooter.component';



function FooterLayout() {
  return (
    <footer>
      <div className="footer_main-container">
        <div className="footer_options">
            <ul>
                <li><IconFooterComp backgroundImage={Logo1}/></li>
                <li><IconFooterComp backgroundImage={Logo2}/></li>
                <li><IconFooterComp backgroundImage={Logo3}/></li>
                <li><IconFooterComp backgroundImage={Logo4}/></li>
            </ul>
        </div>
        <div className="footer_copyright">
            <p>Copyright SportSee 2020</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterLayout;