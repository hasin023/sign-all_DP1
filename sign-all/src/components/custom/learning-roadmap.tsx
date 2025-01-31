import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Lock } from "lucide-react"

const levels = [
    { id: 1, name: "ASL Alphabet", completed: true },
    { id: 2, name: "Basic Greetings", completed: true },
    { id: 3, name: "Numbers 1-20", completed: false },
    { id: 4, name: "Colors and Shapes", locked: true },
    { id: 5, name: "Family Members", locked: true },
    // Add more levels as needed
]

const LearningRoadmap = () => {
    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Your Learning Roadmap</CardTitle>
                <CardDescription>Master American Sign Language step by step</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {levels.map((level) => (
                        <Card key={level.id} className={`${level.locked ? "opacity-50" : ""}`}>
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center space-x-4">
                                    {level.completed && <CheckCircle className="text-green-500" />}
                                    {level.locked && <Lock className="text-gray-400" />}
                                    <span className="font-semibold">{level.name}</span>
                                </div>
                                <Button disabled={level.locked} variant={level.completed ? "outline" : "default"}>
                                    {level.completed ? "Review" : "Start"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default LearningRoadmap

