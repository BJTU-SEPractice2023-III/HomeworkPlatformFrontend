import { Alert, AlertTitle } from '@suid/material';
import { capitalizeFirstLetter } from '../lib/utils';
import { Transition } from 'solid-transition-group';
import { For } from 'solid-js';
import { AlertsStore } from '../lib/store';

// Alerts Container
export default function AlertList() {
  const { alerts, delAlert } = AlertsStore()

  return (
    <div class='w-full absolute z-100 top-20 flex flex-col items-center gap-4'>
      <For each={alerts}>{(alert, index) =>
        <Transition appear={true} onEnter={(el, done) => {
          const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 600
          });
          a.finished.then(done);
        }} onExit={(el, done) => {
          const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 600
          });
          a.finished.then(done);
        }}>
          <Alert
            onClose={() => {
              delAlert(index())
            }}
            severity={alert.type}
            sx={{ minWidth: 300 }}
          >
            <AlertTitle>{capitalizeFirstLetter(alert.type)}</AlertTitle>
            {alert.msg}
          </Alert>
        </Transition>
      }</For>
    </div>
  );
}