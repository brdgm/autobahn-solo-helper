import { Tab } from 'bootstrap';

/**
 * Enables the links inside tab panes to be able to switch to different tabs.
 * @param element Parent element which contains both the tab links and tab panes
 */
export default function(parent : HTMLElement) : void {
  parent.querySelectorAll('a[data-custom-toggle="tab"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      const target = anchor.getAttribute('href')
      if (target) {
        const modalElement = parent.querySelector(target)
        if (modalElement) {
          const tab = new Tab(modalElement)
          tab.show()
        }
      }
    })
  })
}
