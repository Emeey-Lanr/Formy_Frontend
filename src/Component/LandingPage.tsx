import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import "../Styles/landingpage.css"
import { AiOutlineArrowRight } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import heroImg from "../Images/hero.webp"
import faq from "../Images/faq.png"
import dataAnal from "../Images/data.png"
import x from "../Images/x.png"
import { FaPlus, FaGithub, FaLinkedin, FaPhone,  } from 'react-icons/fa'
import { SlPlus, SlArrowDownCircle } from 'react-icons/sl'
import AOS  from "aos"
import LandingPageSideBar from './LandingPageSideBar'

const LandingPage = () => {
  const navigate = useNavigate()
  const faqRef = useRef<HTMLDivElement>(null)

  const overviewRef = useRef<HTMLDivElement>(null)
  const taskFlowRef = useRef<HTMLDivElement>(null);
  const [sideBarSlide, setSideBarSide] = useState<string>("sidebar")
  const [harmburgerTransition, setHarmburgerTransition] = useState<string>("")
  const [faqShowHideAnswers, setFaqShowHideAnswers] = useState <number>(0)
  useEffect(() => {
    AOS.init({duration:3000})
  })
  const sideBarBtn = () => {
    setSideBarSide("openSideBar");
    setHarmburgerTransition("hamburger");
    setTimeout(() => {
       setHarmburgerTransition("")
    },3_000)
    
  }
  const overviewBtn = () => {
    setSideBarSide("sidebar");
    overviewRef.current?.scrollIntoView()
    
  }
  const faqBtn = () => {
       setSideBarSide("sidebar");
     faqRef.current?.scrollIntoView()
  }
  const taskFlowBtn = () => {
       setSideBarSide("sidebar");
     taskFlowRef.current?.scrollIntoView()
  }

  const faqAnswerBtn = (numb: number) => {
    setFaqShowHideAnswers((prev)=> prev === numb ? 0 : numb)
  }
  return (
    <div className="w-p10 bg-appcolor-500">
      <div className="w-full py-4  flex justify-center items-center">
        <div className="nav">
          <div className={``}>
            <Link to="/" className="logo text-fnt_s_2 text-white">
              Formy
            </Link>
          </div>

          {/* Nav */}
          <div className="nav_link_div">
            <button onClick={() => overviewBtn()} className={`nav_link`}>
              Overview
            </button>
            <button onClick={() => faqBtn()} className={`nav_link `}>
              FAQs
            </button>
            <button onClick={() => taskFlowBtn()} className={`nav_link `}>
              Task Flow
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="call-to-action"
            >
              login
            </button>
          </div>
          <div className="hamburger_menu">
            <button onClick={() => sideBarBtn()}>
              <span
                className={`hamburger_menu1 ${harmburgerTransition}-1-transition`}
              ></span>
              <span
                className={`hamburger_menu2 ${harmburgerTransition}-2-transition`}
              ></span>
              <span
                className={`hamburger_menu3 ${harmburgerTransition}-1-transition`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-ignite" data-aos="fade-left">
          <p>Giving power to form</p>
        </div>

        <div className="hero-message">
          <div className="hero_message-content" data-aos="fade-right">
            <h2 data-aos="zoom-in">
              An Ultimate <br />
              <span> Form Solution</span>
            </h2>
            <p>
              Craft custom forms, share them with ease,and gain insights like
              never before
            </p>
            <div className="hero_action">
              <button>Get Started</button>
              <button onClick={() => overviewBtn()}>Read More</button>
            </div>
          </div>
          <div className="hero-img" data-aos="fade-right">
            <img className="main" src={heroImg} alt="" />
          </div>
        </div>
      </div>

      {/*  */}
      {/* Content2 */}

      <div ref={overviewRef} className="introduction" data-aos="flip-left">
        <div className="introduction_content">
          <div className="introduction-text">
            <div>
              <h2>
                Craft <br />
                Your Perfect Form
              </h2>
              <p>
                Our intuitive web app empowers you to design forms that
                Perfectly match your style and needs. No Coding required, with
                formy you can just create what best fit what you want.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content 3 */}
      <div className="rules" data-aos="flip-right">
        <div className="rules_content">
          <div className="rules-text">
            <div>
              <h2>
                Share
                <br />
                <span>With a click</span>
              </h2>
              <p>
                Sharing your forms has never been this simple. Every form
                created comes with a unique link that allows you to Share with
                your selected audience with no hassle within the designed time
                frame
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Flow */}
      <div ref={taskFlowRef} className="flow">
        <div className="time-line-content">
          <div className="heading">
            <h2>Formy Flow</h2>
            <p>Trying to get how the it flows from the beginnig to its peak?</p>
          </div>

          <div className="styles">
            <div className="style">
              <div className="part1 py-2 border-2 border-white">
                <h3 className="text-center">CREATE</h3>
              </div>
              <div className="part2">
                <div>
                  <div></div>
                </div>
                <div>
                  <div>1</div>
                </div>
              </div>
              <div className="part3">
                <h2 className="text-start">FORM CREATION</h2>
                <p className="text-start">
                  You create first which comes with designing to what best fits
                  your purpose
                </p>
              </div>
            </div>

            <div className="style">
              <div className="part1">
                <h2>FORM ACCESIBILITY</h2>
                <p>
                  Each form comes with a unique link, that makes it accessible
                  to anyone you provide the link with.
                </p>
              </div>
              <div className="part2">
                <div>
                  <div></div>
                </div>
                <div>
                  <div>2</div>
                </div>
              </div>
              <div className="part3 part1 py-2 border-2 border-white">
                <h3 className="text-center">SHARE</h3>
              </div>
            </div>

            <div className="style">
              <div className="part1 py-2 border-2 border-white">
                <h3 className="text-center">ANALYSE</h3>
              </div>
              <div className="part2">
                <div>
                  <div></div>
                </div>
                <div>
                  <div>3</div>
                </div>
              </div>
              <div className="part3">
                <h2 className="text-start">RESPONSE BREAK DOWN</h2>
                <p className="text-start">
                  A proper analysis is created based on responses correlation
                  which creates easy form sorting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content 5 */}
      <div ref={faqRef} className="faq">
        <div className="faq-heading">
          <div className="w-10p">
            <h2>
              Frequently Asked <br />
              <span>Questions</span>
            </h2>
            <p>Quick answers to puzzled thoughts</p>
            <div className="faq-content">
              <div className="question">
                <span>Any Information on top performing forms created?</span>
                <button onClick={() => faqAnswerBtn(1)}>
                  {faqShowHideAnswers === 1 ? (
                    <SlArrowDownCircle />
                  ) : (
                    <SlPlus />
                  )}
                </button>
              </div>
              {faqShowHideAnswers === 1 && (
                <div className="answer">
                  <p>
                    Formy gives a graphical representation of top performing
                    forms
                  </p>
                </div>
              )}
            </div>
            <div className="faq-content">
              <div className="question">
                <span>Does it have form validity?</span>
                <button onClick={() => faqAnswerBtn(2)}>
                  {faqShowHideAnswers === 2 ? (
                    <SlArrowDownCircle />
                  ) : (
                    <SlPlus />
                  )}
                </button>
              </div>
              {faqShowHideAnswers === 2 && (
                <div className="answer">
                  <p>
                    Formy comes with the choice of choosing to validate
                    your form within a choosen time frame or not
                  </p>
                </div>
              )}
            </div>
            <div className="faq-content">
              <div className="question">
                <span>Formy form recognition submission? </span>
                <button onClick={() => faqAnswerBtn(3)}>
                  {faqShowHideAnswers === 3 ? (
                    <SlArrowDownCircle />
                  ) : (
                    <SlPlus />
                  )}
                </button>
              </div>
              {faqShowHideAnswers === 3 && (
                <div className="answer">
                  <p>
                    Formy uses email to allow users to submit with serves as an
                    individual recognition for submission
                  </p>
                </div>
              )}
            </div>
            <div className="faq-content">
              <div className="question">
                <span>Can i print my form analysis?</span>
                <button onClick={() => faqAnswerBtn(4)}>
                  {faqShowHideAnswers === 4 ? (
                    <SlArrowDownCircle />
                  ) : (
                    <SlPlus />
                  )}
                </button>
              </div>
              {faqShowHideAnswers === 4 && (
                <div className="answer">
                  <p>
                    Formy allows you to print your analysed form as many times
                    as you want it
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="faq-img">
          <img src={faq} alt="" />
        </div>
      </div>

      {/* ===== */}
      <div className="b-call-to-action">
        <div className="content_div">
          <div className="subheading">
            <div>
              <img src={dataAnal} alt="" />
            </div>
          </div>

          <div className="content">
            <div>
              <h3>Get Ready</h3>
              <h4>why wait ? Explore now</h4>
              <p>
                Ready to revolutionize the ways you create and analyze your
                forms? Start creating on Formy which help analyse your form
                better and faster, breaking it down bit by bit
              </p>
              <div>
                <button onClick={() => navigate("/signup")}>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======== */}
      <div className="footer">
        <div className="content1">
          <div>
            <div>
              <h2>Formy</h2>
              <p>Follow on</p>
              <div className="social pt-4">
                <a className="pr-3" href="https://twitter.com/Emeey_Lanr">
                  <img src={x}  width={16} alt="" />
                </a>

                <a className="px-4" href="https://github.com/Emeey-Lanr">
                  <FaGithub className="text-white" />
                </a>

                <a
                  className="px-4"
                  href="https://www.linkedin.com/in/emmanuel-oyelowo-b2363a23a/"
                >
                  <FaLinkedin className="text-white" />
                </a>

              </div>
            </div>
          </div>
          <div className="links">
            <h3>Useful Links</h3>
            <ul>
              <li>Overview</li>
              <li>Timeline</li>
              <li>FAQs</li>
              <li>Register</li>
            </ul>
          </div>
          <div className="contact">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <span></span>
                <span>+234-8152304412</span>
              </li>
              <li className="mt-2">
                <span></span>
                <span>
                  Ogbomoso <br />
                  0yo State
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className="">
            <p>All rights reserved. © Formy</p>
            <p>designed and coded by Oyelowo Emmanuel</p>
          </div>
        </div>
        <LandingPageSideBar 
          overview={overviewBtn}
          faq={faqBtn}
          taskFlow={taskFlowBtn}
     
          slide={sideBarSlide}
          slideFunction={setSideBarSide}
        />
      </div>
    </div>
  );
}

export default LandingPage