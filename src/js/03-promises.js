import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const firstDelay = parseInt(formData.get('delay'));
  const nextStep = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));


  for (let i = 0; i < amount; i++)
    createPromise(i + 1, firstDelay + i * nextStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
});


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Math.random() > 0.3;
      if (result) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}