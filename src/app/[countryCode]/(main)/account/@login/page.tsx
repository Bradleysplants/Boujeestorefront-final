import { LOGIN_VIEW } from "@modules/account/components/login-template";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const LoginTemplate = ({ setCurrentView }: Props) => {
  return (
    <div className="w-full flex justify-center px-0 py-8 bg-slate-gray">
      {/* You can add logic here to switch between different views */}
    </div>
  );
};

export default LoginTemplate;
