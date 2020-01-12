import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConnectionService } from '../../services/connection.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  ngOnInit() {
  }

  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  active = false;
  notEmpty = false;
  file: File;
  showText = false;

  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  randomId() {
    return Math.floor((1 + Math.random()) * 0x100000000)
      .toString(16)
      .substring(1);
  }




  handleFiles(event) {
    this.file = event.target.files;
    this.notEmpty = true;
    for (let i = 0; i < this.file['length']; i++) {
      this.toastr.info('', `Dodano plik o nazwie ${this.file[i].name}`)
    }
  }


  //method to upload file at firebase storage
  async uploadFile() {
    if (this.file) {
      for (let i = 0; i < this.file['length']; i++) {
        const filePath = `${this.contactForm.controls.contactFormSubjects.value}-${this.contactForm.controls.contactFormEmail.value}-${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()}/${this.file[i].name}`;    //path at which image will be stored in the firebase storage
        await this.afStorage.upload(filePath, this.file[i]);
      }
    } else {
      this.active = false;
    }
  }

  constructor(private fb: FormBuilder, private connectionService: ConnectionService, private toastr: ToastrService, private afStorage: AngularFireStorage) {

    this.contactForm = fb.group({
      'contactFormName': ['', Validators.required],
      'contactFormEmail': ['', Validators.required],
      'contactFormSubjects': [`Zgłoszenie nr: ${this.randomId()}`],
      'contactFormPhone': ['', Validators.required],
      'contactFormModel': ['', Validators.required],
      'contactFormPrzebieg': ['', Validators.required],
      'contactFormRocznik': ['', Validators.required],
      'contactFormPrice': ['', Validators.required],
      'contactFormLokalizacja': ['', Validators.required],
      'contactFormMessage': ['', Validators.required],
      'contactFormImage': [''],
      'recaptchaReactive': [Validators.required]
    });
  }

  public reactiveForm: FormGroup = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required)
  });

  onSubmit() {
    this.active = true;
    const time = setInterval(() => {
      this.toastr.warning('Trwa wysyłanie wiadomości', 'NIE WYŁĄCZAJ STRONY !', {
        timeOut: 7000
      });
    }, 10000)
    this.uploadFile().then(() => {
      this.active = false;
      this.toastr.success('Wiadomość wysłano', 'Sukces !');
      this.contactForm.reset();
      this.disabledSubmitButton = true;
      grecaptcha.reset();
      clearInterval(time);
    })

    this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
    }, error => {
      console.log('Error', error);
      this.active = false;
      this.toastr.error('Wiadomość niewysłano', 'Błąd !');
      grecaptcha.reset();
    });

  }

}
