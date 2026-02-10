import { useStep } from '../api/useStep.js';
function Checklist() {

    const { response, loading, error } = useStep(); 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading step data</div>;

    const handleSubmit = (e) => {
        e.preventDefault(); 
        // Handle form submission logic here
    }
    return( 
        <div>
            {/* Lesson instructions */}
                <div className='lesson-instructions'>
                    <form onSubmit={handleSubmit}>
                    {response?.step?.map((step, index) => (
                        <div key={index}>
                            <input type="checkbox" name={`step-${index}`} />
                            <label>{step.EventName}</label>
                        </div>
                    ))}
                    </form>
                </div>
        </div>
    )
}

export default Checklist;