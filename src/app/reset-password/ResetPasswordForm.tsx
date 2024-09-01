import { Button } from '@/components/atom/Button';

const ResetPasswordForm = () => {
    return (
      <div>
          <form className="flex flex-col items-center justify-center lg:mx-32 mb-8">
              <div className="flex flex-col w-full">
                  <label htmlFor="email" className="text-sm font-bold text-gray-600">Adresse email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Votre adresse email"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
              </div>
              <Button
                  type="submit"
                  className="mt-2 sm:w-full xl:w-auto xl:px-3 px-3 py-1"
              >
                  Réinitialiser mon mot de passe
              </Button>
          </form>
      </div>
    );
};

export default ResetPasswordForm;
