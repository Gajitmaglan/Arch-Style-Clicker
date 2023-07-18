// ==== ↓ =========  W I N D O W  D R A G G I N G  by  "title-bar" ============ ↓ ====

function makeDraggable (elmnt) {
    // Make an element draggable (or if it has a .title-bar class, drag based on the .title-bar element)
    let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;

		// If there is a title-bar classed element, attach to that element instead of full window
    if (elmnt.querySelector('.title-bar')) {
        // If present, the title-bar element is where you move the parent element from
        elmnt.querySelector('.title-bar').onmousedown = dragMouseDown;
    } else {
        // Otherwise, move the element itself
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown (e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Get the mouse cursor position and set the initial previous positions to begin
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // When the mouse is let go, call the closing event
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag (e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Calculate the new cursor position by using the previous x and y positions of the mouse
        currentPosX = previousPosX - e.clientX;
        currentPosY = previousPosY - e.clientY;
        // Replace the previous positions with the new x and y positions of the mouse
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // Set the element's new position
        elmnt.style.top = (elmnt.offsetTop - currentPosY) + 'px';
        elmnt.style.left = (elmnt.offsetLeft - currentPosX) + 'px';
    }

    function closeDragElement () {
        // Stop moving when mouse button is released and release events
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


makeDraggable(document.querySelector('#console'));
makeDraggable(document.querySelector('#shop'));

makeDraggable(document.querySelector('#browser'));

makeDraggable(document.querySelector('#main-plot'));
makeDraggable(document.querySelector('#howtoplay'));

// ===== ↓ ====== W I N D O W  O P E N I N G  a n d  C L O S I N G ========================= ↓ ====================

for (const closeElement of document.querySelectorAll('.title-button.red')) {
    closeElement.addEventListener('click', function () {
        this.parentNode.parentNode.style.display = "none";
    });
}

let openConsole = document.querySelector("#console-icon");
openConsole.addEventListener("click", openConsoleHandler);

function openConsoleHandler() {
  let mainConsole = document.querySelector('#console');
  if (getComputedStyle(mainConsole).display === "none") {
    mainConsole.style.display = "block";
  }
}

let openShop = document.querySelector("#shop-icon");
openShop.addEventListener("click", openShopHandler);

function openShopHandler() {
    let shop = document.querySelector("#shop");
    if (getComputedStyle(shop).display === "none") {
        shop.style.display = "block";
    }
}

let openBrowser = document.querySelector("#browser-icon");
openBrowser.addEventListener("click", openBrowserHandler);

function openBrowserHandler() {
    let browser = document.querySelector("#browser");
    if (getComputedStyle(browser).display === "none") {
        browser.style.display = "block";
    }
}

let openMainPlot = document.querySelector("#main-plot-icon");
openMainPlot.addEventListener("click", openMainPlotHandler);

function openMainPlotHandler() {
    let mainPlot = document.querySelector("#main-plot");
    if (getComputedStyle(mainPlot).display === "none") {
        mainPlot.style.display = "block";
    }
}

let openHowToPlay = document.querySelector("#howtoplay-icon");
openHowToPlay.addEventListener("click", openHowToPlayHandler);

function openHowToPlayHandler() {
    let howToPlay = document.querySelector("#howtoplay");
    if (getComputedStyle(howToPlay).display === "none") {
        howToPlay.style.display = "block";
    }
}

// ====== U P G R A D E  V A L U E S,  T E X T S ============= ↓ ======================= ↓ ================

const originalScale = 'scale(1)';

const persecOutput = document.querySelector("#persec-score");
let pointsPerSecond = 0.1;
persecOutput.innerHTML = pointsPerSecond;

const perclickOutput = document.querySelector("#perclick-score");
let pointsPerClick = 1;
perclickOutput.innerHTML = pointsPerClick;

const scoreOutput = document.querySelector("#total-score");

let totalScore = 0; 
let difficultyModifier = 1.09;

let upgradesForPPC = [0.10, 0.21, 0.33, 0.46, 0.61, 0.77, 0.95, 1.14, 1.36, 1.59];
    // 1.85, 2.14, 2.45, 2.80, 3.18, 3.59, 4.05, 4.56, 5.12];

let upgradesForPPC2 = [0.6, 1.26, 1.98, 2.76, 3.66, 4.62, 5.7, 6.84, 8.16, 9.54];
                    //    11.1, 12.84, 14.7, 16.8, 19.08, 21.54, 24.3, 27.36, 30.72];  // Each upgradesForPPC element => element * 6

let upgradeNamesPPC = [
    "<b>Code Refactoring</b> - Refactor the underlying code of your clicker software to optimize the points calculation algorithm. This upgrade increases the number of points earned with each click.",
    "<b>Malware Bounty</b> - Establish a system that rewards you with bonus points for successfully eliminating malware. This upgrade incentivizes you to actively fight malware while earning additional points for each defeated threat.",
    "<b>Data Recovery Specialist</b> - Unlock the expertise of a data recovery specialist who helps you extract valuable data from malware-infected systems. This upgrade grants bonus points for each successfully recovered piece of lost data.",
    "<b>Ancient Software Artifacts</b> - Discover and collect ancient software artifacts scattered throughout the game world. These artifacts provide bonus points per click and may even unlock additional abilities or upgrades.",
    "<b>Time Travel Paradox</b> - Harness the power of time travel to create a temporal loop that generates bonus points on each click. This upgrade enables you to exploit the time paradox and accumulate more points with each click.",
    "<b>Arch Linux Legacy Database</b> - Gain access to the Arch Linux Legacy Database, which contains valuable information and hidden treasures. This upgrade grants bonus points per click as you unravel the secrets of ancient software technologies.",
    "<b>Firewall Penetration</b> - Develop advanced hacking skills to penetrate firewalls and security measures implemented by malware. This upgrade rewards you with bonus points for successfully breaching the defenses of malware-infected systems.",
    "<b>Supercharged Clicking Technique</b> - Master a powerful clicking technique passed down through generations of Arch Linux warriors. This upgrade enhances the impact of each click, resulting in bonus points earned per click.",
    "<b>Malware Research Lab</b> - Establish a dedicated research lab where you can study and analyze malware samples. This upgrade provides bonus points based on your research progress, encouraging you to delve deeper into the world of malware.",
    "<b>Digital Encryption Breaker</b> - Unlock the ability to break through complex digital encryptions used by malware to hide valuable data. This upgrade rewards you with bonus points for decrypting and retrieving hidden information.",
    // "<b>Advanced Clicking Technique</b> - Master an advanced clicking technique that allows you to click with precision and finesse. This upgrade increases the points earned per click based on your mastery of the technique.",
    // "<b>AI Data Analyzer</b> - Develop an AI-powered data analyzer that identifies valuable data hidden within malware-infected systems. This upgrade grants bonus points for each successfully analyzed and extracted piece of data.",
    // "<b>Retro Computing Knowledge</b> - Uncover ancient knowledge and techniques from the early days of computing. This upgrade boosts your understanding of legacy software technologies, resulting in bonus points per click when interacting with ancient software elements.",
    // "<b>Malware Research Grants</b> - Secure research grants that fund your efforts in fighting malware and uncovering lost data. This upgrade provides a steady stream of bonus points to support your ongoing mission.",
    // "<b>Arch Linux Documentation Cache</b> - Access an extensive cache of Arch Linux documentation and resources. This upgrade rewards you with bonus points per click as you delve deeper into the vast knowledge base of Arch Linux.",
    // "<b>Data Reconstruction Algorithms</b> - Implement advanced algorithms that reconstruct and recover fragmented data from damaged or corrupted files. This upgrade grants bonus points per click when successfully reconstructing lost data.",
    // "<b>Command Line Mastery</b> - Master the command line interface of Arch Linux, enabling you to perform complex operations with speed and precision. This upgrade rewards you with bonus points per click when utilizing command line tools effectively.",
    // "<b>Cryptocurrency Mining Rig</b> - Set up a cryptocurrency mining rig within your clicker game. This upgrade generates bonus points based on the virtual currency mined through your clicks.",
    // "<b>Time-Limited Boosts</b> - Acquire temporary boosts that significantly increase the points earned per click for a limited duration. These upgrades could include time-limited power-ups, rare artifacts, or special events that enhance your clicking abilities.",
    // "<b>Ancient Software Patches</b> - Discover rare and ancient software patches that unlock hidden potential within your clicker software. This upgrade provides bonus points per click and may even introduce new features or mechanics to enhance gameplay."
  ];
  
let upgradeNamesPPC2 = [
    "<b>Binary Mastery</b> - Develop expertise in understanding and manipulating binary code. This upgrade grants bonus points per click when interacting with binary elements within the game world.",
    "<b>Legacy Software Library</b> - Unlock a vast library of legacy software containing valuable information and rare artifacts. This upgrade rewards bonus points per click as you explore and unravel the secrets of ancient software technologies.",
    "<b>Exploit Detection</b> - Enhance your ability to detect and exploit vulnerabilities in malware-infected systems. This upgrade grants bonus points per click when successfully identifying and exploiting weaknesses in the malware's code.",
    "<b>Recursive Clicking Algorithm</b> - Develop a powerful algorithm that enables recursive clicking, where each click triggers a chain reaction of additional clicks. This upgrade provides bonus points per click based on the recursive chain length.",
    "<b>Deep Learning Neural Network</b> - Implement a deep learning neural network that analyzes and predicts optimal clicking strategies. This upgrade adjusts the points earned per click dynamically based on the neural network's recommendations.",
    "<b>Legendary Arch Linux Heroes</b> - Discover legendary heroes from Arch Linux lore who join your cause. Each hero provides a unique ability that increases the points earned per click, empowering you in your fight against malware.",
    "<b>Digital Forensics Lab</b> - Establish a state-of-the-art digital forensics lab to investigate malware and recover valuable data. This upgrade grants bonus points per click based on your lab's research progress and breakthroughs.",
    "<b>Source Code Unearthing</b> - Unearth ancient source code repositories containing valuable artifacts. This upgrade rewards bonus points per click as you navigate and interact with the source code of ancient software technologies.",
    "<b>Quantum Point Entanglement</b> - Harness the power of quantum entanglement to create a connection between points, allowing them to propagate and multiply with each click. This upgrade exponentially increases the points earned per click over time.",
    "<b>Arch Linux Guardians' Blessing</b> - Gain the blessing of the Arch Linux Guardians, ancient beings of immense power. This upgrade provides a permanent increase in points earned per click, strengthening your abilities in the ongoing battle against malware.",
    // "<b>Compiler Optimization</b> - Optimize the compiler settings of your clicker software to generate highly efficient code. This upgrade increases the points earned per click by maximizing the performance of the underlying codebase.",
    // "<b>Legacy Code Gems</b> - Discover hidden gems of legacy code that unlock powerful bonuses. These code gems grant bonus points per click and may introduce unique abilities or unlock special features within the game.",
    // "<b>Malware Disarmament Expertise</b> - Develop expertise in disarming malware, neutralizing its harmful effects, and converting it into bonus points. This upgrade rewards bonus points per click based on the successful disarmament of malware threats.",
    // "<b>Quantum Leap Clicking</b> - Harness the principles of quantum physics to execute quantum leap clicks, instantly teleporting to multiple targets and earning bonus points. This upgrade enables you to click on multiple elements simultaneously, increasing the points earned per click.",
    // "<b>Cryptographic Currency Converter</b> - Develop a system that converts the virtual currency earned in your clicker game into valuable bonus points. This upgrade allows you to exchange cryptocurrencies for additional points per click.",
    // "<b>Arch Linux Time Capsules</b> - Uncover ancient time capsules scattered throughout the game world. Each time capsule holds valuable artifacts that grant bonus points per click and provide insights into Arch Linux's rich history.",
    // "<b>Neural Interface Integration</b> - Implant a neural interface that directly connects your mind to the clicker software. This upgrade enhances your cognitive abilities, resulting in bonus points per click by tapping into your mental prowess.",
    // "<b>Recursive Optimization Algorithm</b> - Implement a powerful recursive optimization algorithm that continually refines your clicking technique. This upgrade gradually increases the points earned per click over time as the algorithm learns and adapts to your clicking patterns.",
    // "<b>Legacy Documentation Translation</b> - Unlock the ability to translate ancient documentation from various programming languages and systems. This upgrade rewards bonus points per click as you decipher and translate valuable information, unveiling the secrets of ancient software technologies.",
    // "<b>Arch Linux Heroic Mode</b> - Unlock a challenging heroic mode in the game, where each click yields significantly higher points. This upgrade provides a more intense and rewarding experience for skilled players, as they earn bonus points per click in this advanced gameplay mode."
  ];

let priceListForPPC = upgradesForPPC.map(value => (value * 100 * 2).toFixed(2));
let priceListForPPC2 = upgradesForPPC2.map(value => (value * 100 * 10).toFixed(2));
console.log("created: " + priceListForPPC)

let upgradesForPPS = [0.12, 0.23, 0.34, 0.45, 0.56, 0.67, 0.78, 0.89, 1.00, 1.11];
                    //   1.22, 1.33, 1.44, 1.55, 1.66, 1.77, 1.88, 1.99];    // after subtraction

let upgradesForPPS2 = [0.6, 1.26, 1.98, 2.76, 3.66, 4.62, 5.7, 6.84, 8.16, 9.54];
                    //    11.1, 12.84, 14.7, 16.8, 19.08, 21.54, 24.3, 27.36, 30.72];    // after subtraction

let upgradeNamesPPS = [
    "<b>Turbocharged Mouse</b> - Enhance your mouse with advanced technology, increasing its responsiveness and allowing you to click faster.",
    "<b>Compiler Optimization</b> - Improve the efficiency of your clicker software by implementing optimized compilation techniques. This upgrade will make each click more powerful and effective.",
    "<b>Kernel Upgrade</b> - Install a more recent and efficient kernel in your Arch Linux system. This upgrade will enhance the underlying software infrastructure, resulting in faster response times and increased click rates.",
    "<b>RAM Overclocking</b> - Push your system's memory to its limits by overclocking the RAM. This upgrade will provide faster data access and retrieval, allowing you to click at an accelerated rate.",
    "<b>Virus Scanner Boost</b> - Strengthen your antivirus software with additional scanning algorithms and heuristics. This upgrade will help you detect and eliminate malware faster, clearing the way for increased clicking.",
    "<b>SSD Accelerator</b> - Upgrade your storage to a high-speed solid-state drive (SSD) that can quickly retrieve and store data. This will reduce loading times and enable faster clicks.",
    "<b>Software Update Manager</b> - Develop an efficient update manager that keeps your software stack up to date. This upgrade will optimize system performance and eliminate any potential bottlenecks, resulting in faster clicking.",
    "<b>Network Optimizer</b> - Fine-tune your network settings to reduce latency and maximize data transfer rates. This will enable your clicks to register with minimal delay, allowing you to click more rapidly.",
    "<b>Firewall Fortification</b> - Strengthen your firewall defenses against malware attacks. This upgrade will provide enhanced protection, allowing you to focus more on clicking and less on combating malicious software.",
    "<b>Ancient Technology Rediscovery</b> - Discover lost artifacts from ancient software technologies, harnessing their power to augment your clicking abilities. Each artifact you find will grant a significant boost to your clicks per second.",
    // "<b>Multithreading Support</b> - Implement multithreading capabilities into your clicker software, allowing it to utilize multiple processor cores effectively. This upgrade will enable you to click faster by distributing the workload across multiple threads.",
    // "<b>Energy Efficiency Optimization</b> - Optimize your system's power consumption and reduce unnecessary background processes. This upgrade will free up system resources, enabling you to click more rapidly without performance degradation.",
    // "<b>GUI Acceleration</b> - Integrate hardware acceleration techniques into your game's graphical user interface (GUI). This upgrade will provide smoother animations and faster response times, allowing you to click more efficiently.",
    // "<b>Crypto Firewall</b> - Develop a specialized firewall that protects your system from cryptojacking and other cryptocurrency-related malware. This upgrade will block unauthorized cryptocurrency mining processes, ensuring optimal performance for clicking.",
    // "<b>Archivist's Wisdom</b> - Unlock the ancient knowledge of the Archivists, granting you insights and techniques to click faster. This upgrade increases your clicking speed and efficiency through hidden techniques and shortcuts.",
    // "<b>Time Warp Compression</b> - Harness the power of time manipulation to compress time during clicking sessions. This upgrade allows you to squeeze more clicks within a limited timeframe, effectively boosting your clicks per second.",
    // "<b>Quantum Clicker Core</b> - Integrate a quantum clicker core into your system, leveraging the principles of quantum computing to process clicks at an exponentially faster rate. This upgrade takes advantage of quantum superposition and entanglement for unparalleled clicking speed.",
    // "<b>Virtualization Mastery</b> - Master the art of virtualization to create virtual clicker instances. This upgrade allows you to run multiple clicker instances simultaneously, effectively multiplying your clicking power.",
    // "<b>Ancient Code Fragments</b> - Collect fragments of ancient code scattered throughout the digital realm. As you gather these fragments, they combine to unlock powerful clicking abilities and boost your clicks per second.",
    // "<b>Clicker Augmentation Implants</b> - Undergo cybernetic enhancements by implanting clicker-focused devices into your body. These implants increase your clicking speed, precision, and stamina, giving you an edge in the battle against malware."
  ];

let upgradeNamesPPS2 = [
    "<b>AI Click Assistant</b> - Develop an AI assistant that automatically performs a certain number of clicks per second on your behalf. This upgrade allows you to maintain a constant click rate even when you're not actively clicking.",
    "<b>Retro Computing Boost</b> - Discover and restore ancient computing relics that provide a significant boost to your clicking capabilities. These relics harness the power of nostalgic technologies, increasing your clicks per second.",
    "<b>Quantum Entanglement Network</b> - Establish a network of quantum-entangled devices that synchronize your clicking actions across multiple machines. This upgrade enables you to click simultaneously on multiple machines, exponentially multiplying your clicking speed.",
    "<b>Click Combo Amplifier</b> - Master the art of click combos by timing your clicks perfectly. This upgrade rewards you with bonus clicks for executing precise and consecutive clicks, significantly increasing your clicks per second.",
    "<b>Cache Optimization</b> - Optimize your system's cache architecture to reduce memory latency during clicking sessions. This upgrade ensures that the required click data is readily available, enabling faster and more responsive clicks.",
    "<b>Debugging Toolkit</b> - Acquire a comprehensive debugging toolkit that allows you to analyze and optimize your clicker software at a low-level. This upgrade helps you identify and eliminate any performance bottlenecks, maximizing your clicks per second.",
    "<b>Virtual Reality Clicker Interface</b> - Dive into a virtual reality environment specifically designed for clicking. This upgrade immerses you in a digital world where your physical movements translate into powerful clicks, enabling you to click faster and more intuitively.",
    "<b>Malware Analyzer</b> - Develop an advanced malware analyzer that automatically detects and neutralizes malicious code. This upgrade frees up system resources and eliminates distractions caused by malware, allowing you to focus on clicking at maximum speed.",
    "<b>Quantum Encryption</b> - Implement quantum encryption techniques to secure your clicking data and prevent unauthorized interference. This upgrade ensures that your clicks are processed securely and without any performance penalties.",
    "<b>Clicker Mastery Training</b> - Embark on a rigorous clicker mastery training program that enhances your clicking reflexes, precision, and speed. This upgrade unlocks new techniques and boosts your natural clicking abilities, resulting in a substantial increase in clicks per second.",
    // "<b>Overclocked Clicking Finger</b> - Upgrade your clicking finger with advanced cybernetic enhancements, allowing it to click at an incredible speed. This upgrade gives you a significant boost in clicks per second.",
    // "<b>Time Dilation Field</b> - Unleash the power of a time dilation field that slows down time within a specific radius. While active, this upgrade gives you the ability to click at an accelerated rate compared to the rest of the world.",
    // "<b>Neural Network Integration</b> - Integrate a neural network into your clicker software, enabling it to learn and adapt to your clicking patterns. This upgrade optimizes your clicking efficiency over time, gradually increasing your clicks per second.",
    // "<b>Ancient Wisdom Scrolls</b> - Discover ancient wisdom scrolls containing secret techniques from long-lost clicker masters. Each scroll you find grants you a new clicking technique, significantly boosting your clicks per second.",
    // "<b>Clicker Amplification Ritual</b> - Perform a powerful ritual that amplifies your clicking abilities. This upgrade temporarily enhances your clicking speed to extraordinary levels, allowing you to click faster than ever before.",
    // "<b>Quantum Click Simulation</b> - Develop a quantum click simulation that explores alternate realities to find the optimal clicking strategy. This upgrade uncovers the most efficient way to click, resulting in a substantial increase in clicks per second.",
    // "<b>Data Compression Algorithms</b> - Implement advanced data compression algorithms into your clicker software. This upgrade reduces the data size required for each click, resulting in faster click processing and increased clicks per second.",
    // "<b>Holographic Interface</b> - Upgrade your clicker game's interface with a cutting-edge holographic display. This upgrade provides a more immersive and intuitive clicking experience, allowing you to click faster and with greater precision.",
    // "<b>Clicker Synchronization Network</b> - Create a network that synchronizes clicker actions with other players. This upgrade allows you to combine your clicking power with other players, collectively achieving an incredible clicks per second rate.",
    // "<b>Ancient Software Guardian</b> - Unlock the power of an ancient software guardian, a legendary entity that protects and empowers clicker enthusiasts. This upgrade grants you its blessing, exponentially increasing your clicks per second while active."
  ];

let priceListForPPS = upgradesForPPS.map(value => (value * 100 * 2).toFixed(2));
let priceListForPPS2 = upgradesForPPS.map(value => (value * 100 * 10).toFixed(2));

// ============================================================================

const archLogo = document.querySelector("pre");
archLogo.addEventListener('click', function() {
    // animaation
    this.style.transform = `scale(1.2)`;
    scoreOutput.style.transform = 'scale(1.5)';
    setTimeout(function() {
        archLogo.style.transform = originalScale;
        scoreOutput.style.transform = originalScale;
    }, 50);
    
    // score
    totalScore += pointsPerClick;
    (scoreOutput.innerHTML === "Null" || scoreOutput.innerHTML === 0) ? scoreOutput.style.color = "rgb(103, 47, 47)" : scoreOutput.style.color = "rgb(74, 130, 74)"; // this rgb = green
    scoreOutput.innerHTML = totalScore.toFixed(2);
});

// ----------------------------------------------------------------------------------------------------------

function purchaseCondition(prefix, backgroundColor, alert) {
    setTimeout(() => {
        inputElement.value = prefix;
        inputElement.style.background = "rgba(0, 0, 0, 0.7)";
    }, 500);
    inputElement.style.background = backgroundColor;
    inputElement.value = prefix + alert;
}

// ---------- ↓ ----------O N  I N P U T ( main algo ) ---------------- ↓ -------------------------------------

const inputElement = document.getElementById("shop-input");
inputElement.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const prefix = "name@computer:~$ ";
    const inputValue = event.target.value.replace(prefix, "");
    event.target.value = prefix;

    console.log("Entered value:", inputValue);

    const regex = /<b>(.*?)<\/b>/;
    let shopOptionPPC = regex.exec(upgradeNamesPPC[0]);
    shopOptionPPC = (shopOptionPPC) ? shopOptionPPC[1].toString() : null;

    let shopOptionPPC2 = regex.exec(upgradeNamesPPC2[0]);
    shopOptionPPC2 = (shopOptionPPC2) ? shopOptionPPC2[1].toString() : null;

    let shopOptionPPS = regex.exec(upgradeNamesPPS[0]);
    shopOptionPPS = (shopOptionPPS) ? shopOptionPPS[1].toString() : null;

    let shopOptionPPS2 = regex.exec(upgradeNamesPPS2[0]);
    shopOptionPPS2 = (shopOptionPPS2) ? shopOptionPPS2[1].toString() : null;

    const wrongInput = () => { return inputValue !== "" && inputValue !== shopOptionPPC && inputValue !== shopOptionPPC2
                        && inputValue !== shopOptionPPS && inputValue !== shopOptionPPS2 }

    if (wrongInput()) {
        purchaseCondition(prefix, "rgb(103, 47, 47)", "No such option!");
    } else if (inputValue === '') {
        // Do nothing
    } else {
        buyUpgrade(inputValue, shopOptionPPC, shopOptionPPC2, shopOptionPPS, shopOptionPPS2, prefix);
    }

    let noMoreShopOptions = (!upgradeNamesPPC[0]) && (!upgradeNamesPPC2[0]) && (!upgradeNamesPPS[0]) && (!upgradeNamesPPS2[0]);
    if (noMoreShopOptions) {
        winCondition();
    }
  }
});

function buyUpgrade(inputValue, shopOptionPPC, shopOptionPPC2, shopOptionPPS, shopOptionPPS2, prefix, noMoreShopOptions) {
    if (shopOptionPPC && inputValue === shopOptionPPC && inputValue !== null) {
        if (priceListForPPC[0] && totalScore >= priceListForPPC[0]) {

            difficultyModifier = 1.09;
            calcTotalPerClick = Number(perclickOutput.innerHTML) + Number(upgradesForPPC[0]) / Math.pow(difficultyModifier, 2);
            perclickOutput.innerHTML = calcTotalPerClick.toFixed(2);

            let updatedValues = updateValuesAfterBuying(totalScore, priceListForPPC, scoreOutput,
                difficultyModifier, pointsPerClick, upgradesForPPC, upgradeNamesPPC);

            totalScore = updatedValues.totalScore;
            priceListForPPC = updatedValues.priceList;

            pointsPerClick = updatedValues.pointsPer;
            upgradesForPPC = updatedValues.upgradesList;
            upgradeNamesPPC = updatedValues.upgradeNameList;

            purchaseCondition(prefix, "rgb(74, 130, 74)", "Purchased successfully!");
        } else {
            purchaseCondition(prefix, "rgb(147, 51, 51)", "Not enough $$$!");
        }

    } else if (inputValue === shopOptionPPC2 && inputValue !== null) {
        if (priceListForPPC2[0] && totalScore >= priceListForPPC2[0]) {

            difficultyModifier = 0.5;
            calcTotalPerClick = Number(perclickOutput.innerHTML) + Number(upgradesForPPC2[0]) / Math.pow(difficultyModifier, 2);
            perclickOutput.innerHTML = calcTotalPerClick.toFixed(2);

            let updatedValues = updateValuesAfterBuying(totalScore, priceListForPPC2, scoreOutput,
                difficultyModifier, pointsPerClick, upgradesForPPC2, upgradeNamesPPC2);

            totalScore = updatedValues.totalScore;
            priceListForPPC2 = updatedValues.priceList;
            pointsPerClick = updatedValues.pointsPer;
            upgradesForPPC2 = updatedValues.upgradesList;
            upgradeNamesPPC2 = updatedValues.upgradeNameList;

            purchaseCondition(prefix, "rgb(74, 130, 74)", "Purchased successfully!");
        } else {
            purchaseCondition(prefix, "rgb(147, 51, 51)", "Not enough $$$!");
        }

    } else if (inputValue === shopOptionPPS && inputValue !== null) {
        if (priceListForPPS[0] && totalScore >= priceListForPPS[0]) {

            difficultyModifier = 1.09;
            calcTotalPerSec = Number(persecOutput.innerHTML) + Number(upgradesForPPS[0]) / Math.pow(difficultyModifier, 2);
            persecOutput.innerHTML = calcTotalPerSec.toFixed(2);

            let updatedValues = updateValuesAfterBuying(totalScore, priceListForPPS, scoreOutput,
                difficultyModifier, pointsPerSecond, upgradesForPPS, upgradeNamesPPS);

            totalScore = updatedValues.totalScore;
            priceListForPPS = updatedValues.priceList;
            pointsPerSecond = updatedValues.pointsPer;
            upgradesForPPS = updatedValues.upgradesList;
            upgradeNamesPPS = updatedValues.upgradeNameList;

            purchaseCondition(prefix, "rgb(74, 130, 74)", "Purchased successfully!");
        } else {
            purchaseCondition(prefix, "rgb(147, 51, 51)", "Not enough $$$!");
        }

    } else if (inputValue === shopOptionPPS2 && inputValue !== null) {
        if (priceListForPPS2[0] && totalScore >= priceListForPPS2[0]) {

            difficultyModifier = 0.5;
            calcTotalPerSec = Number(persecOutput.innerHTML) + Number(upgradesForPPS2[0]) / Math.pow(difficultyModifier, 2);
            persecOutput.innerHTML = calcTotalPerSec.toFixed(2);

            let updatedValues = updateValuesAfterBuying(totalScore, priceListForPPS2, scoreOutput,
                difficultyModifier, pointsPerSecond, upgradesForPPS2, upgradeNamesPPS2);

            totalScore = updatedValues.totalScore;
            priceListForPPS2 = updatedValues.priceList;
            pointsPerSecond = updatedValues.pointsPer;
            upgradesForPPS2 = updatedValues.upgradesList;
            upgradeNamesPPS2 = updatedValues.upgradeNameList;

            purchaseCondition(prefix, "rgb(74, 130, 74)", "Purchased successfully!");
        } else {
            purchaseCondition(prefix, "rgb(147, 51, 51)", "Not enough $$$!");
        }
    }
}

function updateValuesAfterBuying(totalScore, priceList, scoreOutput,
                 difficultyModifier, pointsPer, upgradesList, upgradeNameList) {
    if (totalScore >= priceList[0]) {
      const updatedTotal = totalScore - priceList[0];
      scoreOutput.innerHTML = updatedTotal.toFixed(2);
  
      const updatedPriceList = priceList.slice(1);
  
      const updatedDifficultyModifier = difficultyModifier * difficultyModifier;
      const updatedPoints = pointsPer + upgradesList[0] / updatedDifficultyModifier;
      const updatedUpgrades = upgradesList.slice(1);
      const updatedUpgradeNames = upgradeNameList.slice(1);
  
      return {
        totalScore: updatedTotal,
        priceList: updatedPriceList,
        pointsPer: updatedPoints,
        upgradesList: updatedUpgrades,
        upgradeNameList: updatedUpgradeNames
      };
    }
    return {
      totalScore,
      priceList,
      pointsPer,
      upgradesList,
      upgradeNameList
    };
  }

//   =======================================================================================================

function winCondition() {
    clearInterval(shopRefresher);
    shop.querySelector(".window-content").style.display = "flex";
    shop.querySelector(".window-content").style.justifyContent = "center";
    shop.querySelector(".window-content").style.alignItems = "center";
    shop.querySelector(".window-content").innerHTML = '<h3> You Won The Game! </h3>';
}

setTimeout(addPerSecond, 1000);
function addPerSecond() {
  totalScore += pointsPerSecond;
  scoreOutput.innerHTML = Number(totalScore).toFixed(2);
  (scoreOutput.innerHTML === "Null" || scoreOutput.innerHTML === 0) ? scoreOutput.style.color = "rgb(103, 47, 47)" : scoreOutput.style.color = "rgb(74, 130, 74)"; // this rgb = green
  setTimeout(addPerSecond, 1000);
}

function updateInputValue(input) {
    const prefix = "name@computer:~$ ";
    input.value = prefix + input.value.substring(prefix.length);
  }

// ======== ↓ ========= R E F R E S H  S H O P ================================= ↓ =====================================

const refreshShopInfo = () => {
    displayPPC();
    displayPPS();
};

let shopRefresher = setInterval(refreshShopInfo, 200);

const displayPPC = () => {
    const header = '<h3 style="text-align: center;">update points per click</h3>';
    let upgradeText = (upgradeNamesPPC[0]) ? upgradeNamesPPC[0] + "<br>" : '<span class="finished">finished!</span>';
    let upgradeText2 = (upgradeNamesPPC2[0]) ? upgradeNamesPPC2[0] + "<br>" : '<span class="finished">finished!</span>';

    let priceAndUpgrade = '<div class="price-and-upgrade">' +
                                '<span class="shop-price-PPC"> <b>upgrade:</b> ' + upgradesForPPC[0] + '</span>' +
                                '<span class="shop-price-PPC"> <b>price:</b> ' + priceListForPPC[0] + '</span>' +
                          '</div> <br>';
                          
    let priceAndUpgrade2 = '<div class="price-and-upgrade">' +
                                '<span class="shop-price-PPC2"> <b>upgrade:</b> ' + upgradesForPPC2[0] + '</span>' +
                                '<span class="shop-price-PPC2"> <b>price:</b> ' + priceListForPPC2[0] + '</span>' +
                           '</div> <br>';

    shop.querySelector(".window-content").innerHTML = header;
    shop.querySelector(".window-content").innerHTML += upgradeText;
    shop.querySelector(".window-content").innerHTML += priceAndUpgrade;
    shop.querySelector(".window-content").innerHTML += upgradeText2;
    shop.querySelector(".window-content").innerHTML += priceAndUpgrade2;
    shop.querySelector(".window-content").innerHTML += "<br><hr>";

    if (totalScore >= priceListForPPC[0]) {
        document.querySelectorAll(".shop-price-PPC")[0].style.color = "rgb(74, 130, 74)";
        document.querySelectorAll(".shop-price-PPC")[1].style.color = "rgb(74, 130, 74)";
    } else {
        document.querySelectorAll(".shop-price-PPC")[0].style.color = "rgb(147, 51, 51)";
        document.querySelectorAll(".shop-price-PPC")[1].style.color = "rgb(147, 51, 51)";
    }
    if (totalScore >= priceListForPPC2[0]) {
        document.querySelectorAll(".shop-price-PPC2")[0].style.color = "rgb(74, 130, 74)";
        document.querySelectorAll(".shop-price-PPC2")[1].style.color = "rgb(74, 130, 74)";
    } else {
        document.querySelectorAll(".shop-price-PPC2")[0].style.color = "rgb(147, 51, 51)";
        document.querySelectorAll(".shop-price-PPC2")[1].style.color = "rgb(147, 51, 51)";
    }
}

const displayPPS = () => {

    const headerPPS = '<h3 style="text-align: center;">update points per second</h3>';
    let upgradeTextPPS = (upgradeNamesPPS[0]) ? upgradeNamesPPS[0] + "<br>" : '<span class="finished">finished!</span>';
    let upgradeTextPPS2 = (upgradeNamesPPS2[0]) ? upgradeNamesPPS2[0] + "<br>" : '<span class="finished">finished!</span>';
    
    let priceAndUpgradePPS = '<div class="price-and-upgrade">' +
                                    '<span class="shop-price-PPS"> <b>upgrade:</b> ' + upgradesForPPS[0] + '</span>' +
                                    '<span class="shop-price-PPS"> <b>price:</b> ' + priceListForPPS[0] + '</span>' +
                             '</div> <br>';
                          
    let priceAndUpgradePPS2 = '<div class="price-and-upgrade">' +
                                    '<span class="shop-price-PPS2"> <b>upgrade:</b> ' + upgradesForPPS2[0] + '</span>' +
                                    '<span class="shop-price-PPS2"> <b>price:</b> ' + priceListForPPS2[0] + '</span>' +
                              '</div> <br>';

    shop.querySelector(".window-content").innerHTML += headerPPS;
    shop.querySelector(".window-content").innerHTML += upgradeTextPPS;
    shop.querySelector(".window-content").innerHTML += priceAndUpgradePPS;
    shop.querySelector(".window-content").innerHTML += upgradeTextPPS2;
    shop.querySelector(".window-content").innerHTML += priceAndUpgradePPS2;

    if (totalScore >= priceListForPPS[0]) {
        document.querySelectorAll(".shop-price-PPS")[0].style.color = "rgb(74, 130, 74)";
        document.querySelectorAll(".shop-price-PPS")[1].style.color = "rgb(74, 130, 74)";
    } else {
        document.querySelectorAll(".shop-price-PPS")[0].style.color = "rgb(147, 51, 51)";
        document.querySelectorAll(".shop-price-PPS")[1].style.color = "rgb(147, 51, 51)";
    }
    if (totalScore >= priceListForPPS2[0]) {
        document.querySelectorAll(".shop-price-PPS2")[0].style.color = "rgb(74, 130, 74)";
        document.querySelectorAll(".shop-price-PPS2")[1].style.color = "rgb(74, 130, 74)";
    } else {
        document.querySelectorAll(".shop-price-PPS2")[0].style.color = "rgb(147, 51, 51)";
        document.querySelectorAll(".shop-price-PPS2")[1].style.color = "rgb(147, 51, 51)";
    }
}

// ------------------------------------------------------------------------------------
// ================= A P I    H a n d l i n g =========================================
// ------------------- a n d  b r o w s e r  b u t t o n s ----------------------------

const browserContent = document.querySelector("#browser .window-content");
const apiJokesLink = document.getElementById("api-jokes");
const homePage = browserContent.innerHTML;
let previouslyOpened = '';
let openedTab = '';
const browserBackButton = document.querySelector("#back-button");
const browserReloadButton = document.querySelector("#reload-button");
const browserForthButton = document.querySelector("#forth-button");

const jokesApiUrl = "https://official-joke-api.appspot.com/random_joke";

const getJoke = async () => {
    browserContent.innerHTML = "loading...";
    try {
        await fetch(jokesApiUrl)
            .then((response) => response.json())
            .then((data) => displayJoke(data))
    } catch(err) {
        console.error(err);
    }
};

function displayJoke(data) {
    displayInBrowser(data);

    openedTab = "joke-tab";
    browserForthButton.classList.remove("active")
    browserContent.classList.add(openedTab);

    saveBrowserState(browserContent, browserBackButton, browserReloadButton);
}

browserContent.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop the event from bubbling up to parent elements
    if (event.target.matches("#api-jokes img")) {
        getJoke();
    }
});

function saveBrowserState(browserContent, browserBackButton, browserReloadButton) {
        browserBackButton.classList.add("active");
        browserReloadButton.classList.add("active");
        previouslyOpened = browserContent.innerHTML;

        console.log("previously Opened: ", previouslyOpened)
}

browserBackButton.addEventListener("click", () => {
    if (browserBackButton.classList.contains("active")) {
        browserContent.innerHTML = homePage;
        browserBackButton.classList.remove("active");
        browserReloadButton.classList.remove("active");
        browserForthButton.classList.add("active");
    }
})
browserForthButton.addEventListener("click", () => {
    if (browserForthButton.classList.contains("active")) {
        browserContent.innerHTML = previouslyOpened;
        browserReloadButton.classList.add("active");
        browserBackButton.classList.add("active");
        browserForthButton.classList.remove("active");
    }
})
browserReloadButton.addEventListener("click", () => {
    if (openedTab === "joke-tab") {
        getJoke();
    } else if (openedTab === "bored-tab") {
        getEntertained(); 
    } else if (openedTab === "another-api") {
        // another api handling 
    };
})

const boredApiUrl = "https://www.boredapi.com/api/activity";

const getEntertained = async () => {
    browserContent.innerHTML = "loading...";
    try {
        await fetch(boredApiUrl)
            .then((response) => response.json())
            .then((data) => displayEntertainment(data))
    } catch(err) {
        console.error(err);
    }
};
browserContent.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop the event from bubbling up to parent elements
    if (event.target.matches("#api-bored img")) {
        browserContent.innerHTML = "loading...";
        getEntertained();
    }
});

function displayEntertainment(data) {
    displayInBrowser(data);

    openedTab = "bored-tab";
    browserForthButton.classList.remove("active")
    browserContent.classList.add(openedTab);

    saveBrowserState(browserContent, browserBackButton, browserReloadButton);
}

function displayInBrowser(obj) {
    browserContent.innerHTML = "";
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`);
            browserContent.innerHTML += `<div class="api-data"><span>${key}: </span> ${obj[key]}</div>`;
        }
    }
}
