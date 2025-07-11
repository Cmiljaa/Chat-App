import { computed, reactive } from 'vue';
import { required, minLength, email, sameAs, helpers } from '@vuelidate/validators';

export default function useAuthForm(method: 'signup' | 'signin'){
	const formData = reactive(
		method === 'signup'
			? {
					nickname: '',
					email: '',
					password: '',
					repeatPassword: ''
			  }
			: {
					email: '',
					password: ''
			  }
	);

	const rules = computed(() => {
		if (method === 'signup') {
			return {
				nickname: { required, minLength: minLength(5) },
				email: { required, email },
				password: { required, minLength: minLength(6) },
				repeatPassword: {
					required,
					sameAsPassword: helpers.withMessage(
						'Passwords do not match',
						sameAs(() => formData.password)
					)
				}
			};
		} else {
			return {
				email: { required, email },
				password: { required, minLength: minLength(6) }
			};
		}
	});

	const handleErrors = (error: any): string => {
		if (method === 'signup') {
			switch (error.code) {
				case 'auth/weak-password':
					return 'Password should be at least 6 characters long.';
				case 'auth/invalid-email':
					return 'Please enter a valid email address.';
				default:
					return 'An unexpected error occurred. Please try again.';
			}
		} else {
			switch (error.code) {
				case 'auth/invalid-credential':
				case 'auth/user-not-found':
				case 'auth/wrong-password':
					return 'Invalid email or password.';
				case 'auth/user-disabled':
					return 'This account has been disabled.';
				case 'auth/too-many-requests':
					return 'Too many failed attempts. Please try again later.';
				default:
					return 'An unexpected error occurred. Please try again.';
			}
		}
	};

	return {
		formData,
		rules,
		handleErrors
	};
}