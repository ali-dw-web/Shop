'use client'
import "./globals.css";
import { useEffect, useRef } from "react";
export default function RootLayout({ children }) {
  const bar = useRef([])
  function check(e) {
    if (window.innerWidth < 1024) {
      e.target.nextElementSibling.classList.toggle('heig')
    }
  }
  useEffect(()=>{
     bar.current.forEach((val, i) => {
            val.addEventListener('click', (e) => {
                bar.current.forEach((val) => {
                    if (!(e.target.nextElementSibling.getAttribute('data-num') == i)) {
                        val.nextElementSibling.style.height = '0px'
                    }
                })
            })
        })
  } , [])
  return (
    <>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=visibility" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="/font/icofont/icofont.min.css" />

        </head>
        <body

        >

          {children}
          <div className='w-[100%] lg:h-[350px] min-h-[350px]  mt-4 bg-[#181e28] flex justify-start lg:justify-around
             items-center lg:flex-nowrap flex-wrap'>
            <div className='lg:w-[30%] sm:w-[50%] w-[80%] lg:ml-0 ml-5 h-[100%] '>
              <div className='w-[100%] lg:h-[75px]  h-[55px]   flex justify-start items-center '>
                <img className='h-[60%]' src="https://raw.githubusercontent.com/ali-dw-web/img/main/logo-dark.png" alt="" />
              </div>
              <div className='  lg:mt-3 w-[100%] h-[80px] text-[15px]  flex justify-center items-center text-[#979797]'>The Mantu is the biggest market of grocery products. Get your daily needs from our store.</div>
              <div className='  lg:mt-3 w-[100%] min-h-[80px]  flex  lg:justify-start items-center lg:flex-nowrap flex-wrap '>
                <div className='lg:w-[150px] lg:h-[50px] w-[110px] h-[40px]  rounded-xl bg-[#4b5966] flex justify-center items-center overflow-hidden'>
                  <img src="https://raw.githubusercontent.com/ali-dw-web/img/main/apple.png" alt="" />
                </div>
                <div className='lg:w-[150px] lg:h-[50px] w-[110px] h-[40px] ml-2 rounded-xl  bg-[#4b5966] flex justify-center items-center overflow-hidden'>
                  <img src="https://raw.githubusercontent.com/ali-dw-web/img/main/android.png" alt="" />
                </div>
              </div>
            </div>
            <div className='lg:w-[70%] w-[100%] h-[100%]  lg:flex lg:justify-start lg:items-center'>
              <div className='lg:w-[21%] w-[97%] mx-auto  '>
                <div onClick={check} ref={(el) => bar.current[0] = el} className='w-[98%]  h-[35px] lg:h-[45px] border-b border-dashed border-[#696868] flex justify-start items-center lg:text-[18px] font-[500] lg:pl-0 pl-5 text-[13px] text-[#afaeae]'>Category</div>
                <div data-num='0' data-h='150' className='w-[100%] lg:h-[270px] h-[0px]  overflow-hidden duration-500'>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:text-[16px] text-[13px] lg:pl-0 pl-5 hover:text-[#ffd783] duration-500  flex justify-start items-center font[400] text-[#8f8d8d]'>Fashion</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500  flex justify-start items-center font[400] text-[#8f8d8d]'>Cosmetics</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500  flex justify-start items-center font[400] text-[#8f8d8d]'>Bags and Purse</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500  flex justify-start items-center font[400] text-[#8f8d8d]'>Shoes</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Belts</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Perfumes</div>

                </div>
              </div>
              <div className='lg:w-[23%] w-[97%] mx-auto   '>
                <div onClick={check} ref={(el) => bar.current[1] = el} className='w-[98%] h-[35px] lg:h-[45px] border-b border-dashed border-[#696868] flex justify-start items-center lg:text-[18px] font-[500] pl-5 text-[13px] lg:pl-0 pl-5 text-[#afaeae]'>Company</div>
                <div data-num='1' data-h='150' className='w-[100%] lg:h-[270px] h-[0px]  overflow-hidden duration-500'>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>About us</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Delivery</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Legal Notice</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Terms of use</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Secure payment</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Contact us</div>

                </div>
              </div>
              <div className='lg:w-[23%] w-[97%] mx-auto  '>
                <div onClick={check} ref={(el) => bar.current[2] = el} className='w-[98%]  h-[35px] lg:h-[45px] border-b border-dashed border-[#696868] flex justify-start items-center lg:text-[18px] font-[500] pl-5 text-[13px] lg:pl-0 pl-5 text-[#afaeae]'>Account</div>
                <div data-num='2' data-h='150' className='w-[100%] lg:h-[270px] h-[0px]  overflow-hidden duration-500'>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Sign In</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>View Cart</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Return Policy</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Become a Vendor</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Affiliate Program</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]'>Payments</div>

                </div>
              </div>
              <div className='lg:w-[30%] w-[97%] mx-auto   '>
                <div onClick={check} ref={(el) => bar.current[3] = el} className='w-[98%]  h-[35px] lg:h-[45px] border-b border-dashed border-[#696868] flex justify-start items-center lg:text-[18px] font-[500] text-[13px] pl-5 lg:pl-0 pl-5 text-[#afaeae]'>Contact</div>
                <div data-num='3' data-h='75' className='w-[100%] lg:h-[270px] h-[0px]  overflow-hidden duration-500'>
                  <div className='w-[100%] lg:min-h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[14px] lg:mt-6 text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d] ] '>
                    <span className='icofont-location-pin text-[#646161] text-[28px]'></span>
                    1234 Elm Street Springfield Avenue, Brooklyn den, IL 62704 USA.
                  </div>
                  <div className='w-[100%] lg:h-[45px] h-[25px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]   '> <span className='icofont-brand-whatsapp text-[#646161] text-[20px]'></span>+989104578437</div>
                  <div className='w-[100%] lg:h-[45px] h-[25px]  lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex justify-start items-center font[400] text-[#8f8d8d]  '> <span className='icofont-ui-email text-[#646161] text-[20px]'></span>example@gmail.com</div>
                  <div className='lg:w-[100%] lg:mt-0 mt-4 sm:w-[35%] w-[45%] lg:h-[100px] h-[35px] lg:pl-0 pl-5 lg:text-[16px] text-[13px] hover:text-[#ffd783] duration-500 flex  font[400] text-[#8f8d8d]  flex justify-around items-center'>
                    <div className=' text-[white] hover:text-[black] hover:bg-[#ffd783] duration-400 text-[15px] w-[35px] h-[35px] icofont-instagram  rounded-[5px] bg-[#4b5966] flex justify-center items-center hover:bg-[#ffd783]  duration-400'></div>
                    <div className='text-[white] hover:text-[black]  hover:bg-[#ffd783] duration-400 text-[15px] w-[35px] h-[35px] icofont-twitter rounded-[5px] bg-[#4b5966] flex justify-center items-center hover:bg-[#ffd783]  duration-400'></div>
                    <div className=' text-[white] hover:text-[black] hover:bg-[#ffd783] duration-400 text-[15px] w-[35px] h-[35px] icofont-linkedin rounded-[5px] bg-[#4b5966] flex justify-center items-center hover:bg-[#ffd783]  duration-400'></div>
                    <div className='w-[35px] h-[35px] icofont-facebook text-[white] hover:text-[black] rounded-[5px] bg-[#4b5966] flex justify-center items-center hover:bg-[#ffd783] duration-400 text-[15px]'></div>
                  </div>


                </div>
              </div>

            </div>
          </div>
          <div className=' bg-[#181e28] w-[100%] min-h-[45px]  flex justify-center items-center lg:flex-nowrap flex-wrap'>
            <div className='lg:w-[50%] w-[100%] h-[100%] lg:mt-0 mt-1.5  flex lg:justify-start justify-center text-[#8d8b8b] items-center  lg:pl-5 text-[13px]'>Copyright © 2026 <span className='text-[#ffd783] pr-1.5 pl-1.5'> the Mantu </span> all rights reserved.</div>
            <div className='lg:w-[50%] w-[100%] h-[100%]  flex lg:justify-end justify-center items-center lg:mt-0 mt-1.5  lg:pr-5'>
              <img src="https://raw.githubusercontent.com/ali-dw-web/img/main/payment.png" alt="" />
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
