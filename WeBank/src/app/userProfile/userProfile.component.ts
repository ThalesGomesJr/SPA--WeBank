import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-userProfile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = new User();
  editForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService,
              private modalService: BsModalService, private fb: FormBuilder,
              private acRouter: ActivatedRoute, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.validationEdit();
    this.validationPassword();
    this.getUser();
  }

  // tslint:disable-next-line: typedef
  getUser(){
    this.acRouter.params.subscribe(params => {
      this.userService.getUserById(params.id).subscribe((user: User) => {
        this.user = Object.assign({}, user);
      });
    });
    /*this.userService.getUserById(idUser).subscribe((user: User) => {
      this.user = Object.assign({}, user);
      console.log(user);
      // this.fileNameToUpload = evento.imagemURL.toString();
      // this.dataAtual = new Date().getMilliseconds().toString();
      // this.imagemURL = `http://localhost:5000/Resources/Images/${this.evento.imagemURL}?_ts=${this.dataAtual}`;
      //this.evento.imagemURL = '';
      //this.registerForm.patchValue(this.evento);

    });*/
  }

  // tslint:disable-next-line: typedef
  editUser(user: User, template: any){
    this.openModal(template);
    this.user = Object.assign({}, user);
    this.editForm.patchValue(this.user);
  }

  // tslint:disable-next-line: typedef
  validationEdit(){
    this.editForm = this.fb.group({
      userName : ['', Validators.required],
      fullName : ['', Validators.required],
      cpf: ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  editPassword(template: any){
    this.openModal(template);
  }

  // tslint:disable-next-line: typedef
  validationPassword(){
    this.passwordForm = this.fb.group({
      passwords : this.fb.group({
        password : ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword : ['', Validators.required]
      }, { validators : this.verifyPassword })
    });
  }

  // tslint:disable-next-line: typedef
  verifyPassword(fb: FormGroup){
    const confirmSenhaCtrl = fb.get('confirmPassword');
    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value){
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  // tslint:disable-next-line: typedef
  savePassword(template: any){
    if (this.passwordForm.valid){
      const password = this.passwordForm.get('passwords').get('password').value;
      this.user.password = password;
      this.userService.updatePassword(this.user).subscribe(
        () => {
          template.hide();
          localStorage.removeItem('token');
          this.router.navigate(['/user/login']);
          this.toastr.success('Senha Alterada com Sucesso');
        }, () => {
          this.toastr.error('Erro ao tentar Alterar Senha');
        }
      );
    }
  }

  // tslint:disable-next-line: typedef
  saveEdit(template: any){
    if (this.editForm.valid){
      this.user = Object.assign({id: this.user.id}, this.editForm.value);
        // this.uploadImagem();

      this.userService.updateUser(this.user).subscribe(
        () => {
          template.hide();
          this.getUser();
          this.toastr.success('Editado com Sucesso');
        }, () => {
          this.toastr.error('Erro ao tentar Editar');
        }
      );
    }
  }

  // tslint:disable-next-line: typedef
  openModal(template: any){
    this.editForm.reset();
    this.passwordForm.reset();
    template.show();
  }

  // tslint:disable-next-line: typedef
  deleteUser(user: User, template: any) {
    this.openModal(template);
    this.user = user;
  }

  // tslint:disable-next-line: typedef
  confirmDelete(template: any) {
    this.userService.deleteUser(this.user.id).subscribe(
      () => {
      template.hide();
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
      this.toastr.success('Conta Excluída com Sucesso');
      }, () => {
        this.toastr.error('Erro ao tentar Deletar');
      }
    );
  }

}
