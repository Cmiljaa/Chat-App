import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

const showToast = (method: 'success' | 'info' | 'warning' | 'error', message: string): void => {
  	$toast[method](message, { duration: 3000 });
};

export default showToast;