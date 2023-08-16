import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
   <div class="h-fit flex justify-center items-center py-2">
      <span class="bg-blue-400 flex space-x-6 items-center px-10 py-2 text-white font-bold rounded-md">
        <i class="bi bi-arrow-clockwise text-3xl animate-spin"></i>
        Chargement...
    </span>
  </div>
  `,
})
export class LoaderComponent {

}
