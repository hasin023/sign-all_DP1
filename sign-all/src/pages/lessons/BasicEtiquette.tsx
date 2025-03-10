import LessonLayout from "@/components/LessonLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const BasicEtiquette = () => {
    const router = useRouter();

    return (
        <LessonLayout title="Basic Etiquette and Common Misconceptions">
            
            {/* Introduction Section */}
            <section className="bg-blue-50 p-6 rounded-lg shadow-md">
                <p className="text-gray-700 text-lg">
                    When communicating in ASL, it's important to understand **cultural etiquette** to ensure **respectful** 
                    and **effective interaction**. Below are key etiquette points that will help improve your ASL communication.
                </p>
            </section>

            {/* Etiquette Rules Section */}
            <h3 className="text-3xl font-bold mt-12 text-center text-blue-600">ASL Communication Etiquette</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h4 className="text-lg font-semibold text-blue-600">👀 Maintain Eye Contact</h4>
                    <p className="text-gray-700 mt-2">
                        This is **crucial** for effective communication in ASL. It shows **attentiveness** and **respect** to the speaker.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h4 className="text-lg font-semibold text-green-600">😊 Use Facial Expressions</h4>
                    <p className="text-gray-700 mt-2">
                        ASL **relies heavily** on facial expressions to convey **meaning** and **emotion**.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <h4 className="text-lg font-semibold text-red-600">✋ Don't Interrupt</h4>
                    <p className="text-gray-700 mt-2">
                        When someone is signing, **wait until they are finished** before responding. Avoid waving hands excessively.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h4 className="text-lg font-semibold text-yellow-600">⏳ Be Patient</h4>
                    <p className="text-gray-700 mt-2">
                        ASL is **not English translated into signs**—it has its **own grammar** and **structure** that may take time to learn.
                    </p>
                </div>
            </div>

            {/* Common Misconceptions Section */}
            <h3 className="text-3xl font-bold mt-12 text-center text-red-600">Common Misconceptions About ASL</h3>
            <div className="mt-6 space-y-6">
                <div className="bg-red-50 p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <h4 className="text-lg font-semibold text-red-600">❌ Myth: ASL is just signed English.</h4>
                    <p className="text-gray-700 mt-2">
                        ✅ **Fact:** ASL is a **complete, independent language** with its **own grammar** and **vocabulary**.
                    </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <h4 className="text-lg font-semibold text-red-600">❌ Myth: ASL is the same as other sign languages worldwide.</h4>
                    <p className="text-gray-700 mt-2">
                        ✅ **Fact:** Different countries have their **own sign languages** (e.g., **BSL, LSF**), and ASL is unique.
                    </p>
                </div>
            </div>

            {/* Interactive Example */}
            <h4 className="text-2xl font-semibold mt-12 text-center text-blue-600">Interactive Practice</h4>
            <p className="text-gray-700 text-center mt-2">
                Below is an **interactive exercise** where you can **choose the correct ASL etiquette rule**!
            </p>

            <div className="flex flex-col items-center mt-6 space-y-4">
                <button className="bg-green-100 hover:bg-green-200 px-6 py-3 rounded-lg shadow-md text-lg font-semibold text-green-800 w-full max-w-md">
                    ✅ Always maintain eye contact
                </button>
                <button className="bg-red-100 hover:bg-red-200 px-6 py-3 rounded-lg shadow-md text-lg font-semibold text-red-800 w-full max-w-md">
                    ❌ Interrupt the signer with hand gestures
                </button>
                <button className="bg-green-100 hover:bg-green-200 px-6 py-3 rounded-lg shadow-md text-lg font-semibold text-green-800 w-full max-w-md">
                    ✅ Use facial expressions to express emotions
                </button>
            </div>

            {/* Video Section */}
            <h4 className="text-2xl font-semibold mt-12 text-center text-blue-600">Watch This Demonstration</h4>
            <p className="text-gray-700 text-center mt-2">
                Here's an example of how **facial expressions** and **eye contact** are used in ASL.
            </p>
            <div className="flex justify-center mt-2">
                <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/D7TWKTMcj_8"
    title="ASL Etiquette"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
></iframe>

            </div>

            

            {/* Back to Roadmap Button */}
            <div className="mt-12 text-center">
                <Button
                    onClick={() => router.push("/roadmap")}
                    className="px-6 py-3 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition duration-200"
                >
                    Back to Roadmap
                </Button>
            </div>
        </LessonLayout>
    );
};

export default BasicEtiquette;
