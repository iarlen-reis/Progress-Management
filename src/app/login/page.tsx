import LoginWithGithub from '@/components/LoginWithGithub'

export default async function Login() {
  return (
    <section className="h-[600px] mt-10 mx-auto grid grid-cols-1 md:grid-cols-2 rounded-md overflow-hidden shadow-md">
      <div className="hidden md:block w-full h-full bg-gradient-to-br from-slate-800 via-slate-600 to-slate-500"></div>
      <div className="w-full max-w-[440px] mx-auto flex flex-col items-center justify-center gap-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-fredoka font-medium">
            Progress
            <span className="text-slate-500 font-bold">Management</span>
          </h1>
          <p className="text-lg antialiased w-full">
            Faça login para gerenciar seus progressos de forma fácil e efciente.
          </p>
        </div>
        {/* <form className="w-full space-y-5">
          <FieldSet>
            <Label htmlFor="email">
              Email <IsRequired />
            </Label>
            <Input id="email" name="email" type="email" required />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="password">
              Senha <IsRequired />
            </Label>
            <Input id="password" name="password" type="password" required />
          </FieldSet>
          <ButtonForm
            text="Entrar"
            textOnLoading="Entrando..."
            className="w-full h-11"
          />
        </form> */}
        <div className="flex items-center justify-center gap-2 w-full">
          <div className="w-1/4 h-[1px] bg-slate-300"></div>
          <p className="text-slate-500">ou</p>
          <div className="w-1/4 h-[1px] bg-slate-300"></div>
        </div>
        <LoginWithGithub />
      </div>
    </section>
  )
}
