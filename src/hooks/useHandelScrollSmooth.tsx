const useHandleScrollSmooth = (
    elementId: string,
    setIsMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return () => {
        console.log('Scrolling to:', elementId);
        const element = document.getElementById(elementId);
        if (element) {
            console.log('Element found:', elementId);
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Element not found:', elementId);
        }
        if (setIsMobileMenuOpen) {
            setIsMobileMenuOpen(false); //? Close mobile menu after navigation
        }
    };
};

export default useHandleScrollSmooth;
