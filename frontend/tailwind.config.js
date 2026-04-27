/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        '../../stitch_remix_of_uni_hub_user_management_list/uni_hub_session_scheduling_and_records/code.html',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#135bec',
                'background-light': '#f6f6f8',
                'background-dark': '#101622',
                surface: '#1a2131',
                'border-color': '#2d3748',
            },
            fontFamily: {
                display: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                full: '9999px',
            },
        },
    },
    plugins: [],
};
