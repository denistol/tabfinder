document.addEventListener('DOMContentLoaded', function () {

    const tabList = document.getElementById('tabList');
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clear-button');

    searchInput.focus();
    let query = '';

    const displayTabs = () => {
        browser.tabs.query({}, (_tabs) => {

            const tabs = _tabs.filter(tab => !query ? true : tab.title.toLowerCase().includes(query.toLowerCase()));
            tabList.innerHTML = '';

            tabs.forEach((tab, tabIndex) => {
                const tabItem = document.createElement('li');

                const tabImage = document.createElement('img');
                tabImage.src = tab.favIconUrl;

                tabItem.textContent = tab.title;
                tabItem.dataset.tabId = tab.id;
                tabList.appendChild(tabItem);
                tabItem.prepend(tabImage);
            });
        });
    };

    displayTabs();

    searchInput.addEventListener('input', () => {
        query = searchInput.value.toLowerCase();
        displayTabs();
    });

    clearButton.addEventListener('click', () => {
        query = '';
        searchInput.value = '';
        displayTabs();
        searchInput.focus();
    })

    tabList.addEventListener('click', (event) => {
        const tabId = parseInt(event.target.dataset.tabId);
        if (!isNaN(tabId)) {
            query = '';
            browser.tabs.update(tabId, { active: true });
            window.close();
        }
    });

    tabList.addEventListener('mouseover', (event) => {
        const tabId = parseInt(event.target.dataset.tabId);
        if (!isNaN(tabId)) {
            browser.tabs.update(tabId, { active: true });
        }
    });

    // TODO: Select tabs by arrow keys

    // searchInput.addEventListener('keydown', e => {
    //     const isUp = e.key === 'ArrowUp';
    //     const isDown = e.key === 'ArrowDown';

    //     if(isUp || isDown) {
    //         if(isUp && index > 0) {
    //             index -= 1;
    //         };
    //         if(isDown) {
    //             index += 1;
    //         };

    //         displayTabs();
    //     }
    // });

    // TODO: Hotkey autorun

    // browser.commands.onCommand.addListener(function (command) {
    //     if (command === "toggle-tab-search") {
    //         toggleTabSearch();
    //     }
    // });

    // function toggleTabSearch() {
    //     console.log("Tab Search Toggled");
    // }
});
