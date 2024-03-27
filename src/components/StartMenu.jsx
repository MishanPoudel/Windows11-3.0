import React from "react";
import Power from "./Power";

function StartMenu({ toggleStart, toggleMenu, isStartOpen }) {
  return (
    <>
      <section
        id="w11-start-section"
        className={`z-50 bg-neutral-800 ${
          isStartOpen ? "bottom-16" : "bottom-[-800px]"
        }`}
      >
        <div className="input-div-start">
          <input
            type="text"
            id="cerca-input-start"
            placeholder="Search for apps, settings, and documents"
          />
        </div>
        <div className="padding-start">
          <div id="apps-container">
            <div className="app-container-header">
              <span>Pinned</span>
              <div>
                <span>All apps</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgba(0, 0, 0, 1)"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </div>
            </div>
            <div id="second-app-container">
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/edge-icon.png"
                  alt="edge icon"
                />
                <span>Edge</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/word-icon.png"
                  alt="word icon"
                />
                <span>Word</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/excel-icon.png"
                  alt="excel icon"
                />
                <span>Excel</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/powerpoint-icon.png"
                  alt="powerpoint icon"
                />
                <span>Powerpoint</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/ms-office.ico"
                  alt="office icon microsoft"
                />
                <span>Office</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/calendar-icon.png"
                  alt="calendar icon"
                />
                <span>Calender</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/ms-store-icon.png"
                  alt="microsoft store icon"
                />
                <span>Microsoft Store</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/ms-foto-icon.ico"
                  alt="galleria icon by microsoft 11"
                />
                <span>Photos</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/ms-video-icon.ico"
                  alt="microsoft video icon by microsoft"
                />
                <span>Film & TV</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/Paint-2D.ico"
                  alt="paint 2d icon by microsoft"
                />
                <span>Paint</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/Paint-3D.ico"
                  alt="paint 2d icon by microsoft"
                />
                <span>Paint 3D</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/Whiteboard.ico"
                  alt="whiteboard icon by microsoft"
                />
                <span>WhiteBoard</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/ms-impostazioni-icon.ico"
                  alt="impostazioni icon by microsoft"
                />
                <span>Settings</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/ms-skype.ico"
                  alt="skype icon by microsoft"
                />
                <span>Skype</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
                  alt="vs code icon by microsoft"
                />
                <span>VS code</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/vs-normal.ico"
                  alt="visual Studio normal icon by microsoft"
                />
                <span>Visual Studio</span>
              </div>
              <div className="app-icon">
                <img
                  src="https://laaouatni.github.io/w11CSS/images/ms-file-explorer.ico"
                  alt="file Explorer icon by microsoft"
                />
                <span>File Explorer</span>
              </div>
            </div>
          </div>
          <div id="article-div">
            <div className="app-container-header">
              <span>Recommended</span>
              <div>
                <span>More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgba(0, 0, 0, 1)"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </div>
            </div>
            <div id="article-container">
              <div className="recent">
                <div>
                  <img
                    src="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
                    alt="VS code icon"
                  />
                </div>
                <div>
                  <div>VS Code</div>
                  <div>Recently added</div>
                </div>
              </div>
              <div className="recent">
                <div>
                  <img
                    src="https://laaouatni.github.io/w11CSS/images/vs-normal.ico"
                    alt="visual studio icon"
                  />
                </div>
                <div>
                  <div>Visual Studio</div>
                  <div>Recently added</div>
                </div>
              </div>
              <div className="recent">
                <div>
                  <img
                    src="https://laaouatni.github.io/w11CSS/images/Photos-folder.ico"
                    alt="folder microsoft"
                  />
                </div>
                <div>
                  <div>Study Materials</div>
                  <div>30 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer-start-section">
          <div className="nome-utente-start-section">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="rgba(0, 0, 0, 1);"
            >
              <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
            </svg>
            <span>username</span>
          </div>
          <div className="spegni-pc-start-section">
            <Power toggleMenu={toggleMenu} toggleStart={toggleStart}/>
          </div>
        </div>
      </section>
    </>
  );
}

export default StartMenu;
