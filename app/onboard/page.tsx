"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Upload, CheckCircle, Save, Send } from "lucide-react"
import { initializeGSAP } from "@/lib/gsap-animations"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(2, "Location is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
})

type FormData = z.infer<typeof formSchema>

const categories = [
  "Singer",
  "DJ",
  "Dancer",
  "Speaker",
  "Performer",
  "Choreographer",
  "Producer",
  "MC",
  "Motivational Coach",
  "Songwriter",
]

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Mandarin",
  "Japanese",
  "Korean",
  "Hindi",
]

const feeRanges = ["$250-500", "$500-750", "$750-1000", "$1000-1500", "$1500-2000", "$2000-3000", "$3000+"]

export default function OnboardPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
      email: "",
      phone: "",
    },
  })

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("artistly-draft")
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft)
        form.reset(draftData.formData)
        if (draftData.image) {
          setSelectedImage(draftData.image)
        }
        toast({
          title: "Draft Loaded",
          description: "Your previously saved draft has been loaded.",
        })
      } catch (error) {
        console.error("Failed to load draft:", error)
      }
    }
  }, [form, toast])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      console.log("Form submitted:", data)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear draft after successful submission
      localStorage.removeItem("artistly-draft")

      setIsSubmitted(true)
      toast({
        title: "Application Submitted!",
        description: "Thank you for joining Artistly. We'll review your application soon.",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveAsDraft = async () => {
    setIsSaving(true)
    try {
      const formData = form.getValues()
      const draftData = {
        formData,
        image: selectedImage,
        savedAt: new Date().toISOString(),
      }

      localStorage.setItem("artistly-draft", JSON.stringify(draftData))

      toast({
        title: "Draft Saved",
        description: "Your application has been saved as a draft.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        toast({
          title: "Image Uploaded",
          description: "Profile image has been uploaded successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    initializeGSAP()
  }, [])

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for joining Artistly. We'll review your application and get back to you within 2-3 business
              days.
            </p>
            <div className="space-y-2">
              <Button onClick={() => setIsSubmitted(false)} className="w-full">
                Submit Another Application
              </Button>
              <Button variant="outline" asChild className="w-full">
                <a href="/">Return to Homepage</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Artistly as a Performer</h1>
          <p className="text-lg text-muted-foreground">
            Create your artist profile and start receiving booking requests
          </p>
        </div>

        <Card className="gsap-fade-in bg-card/90 backdrop-blur-md shadow-xl border-0">
          <CardHeader>
            <CardTitle>Artist Application Form</CardTitle>
            <CardDescription>Please fill out all required fields to create your artist profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your experience, style, and what makes you unique..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum 50 characters. This will be displayed on your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Performance Categories
                  </h3>

                  <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                      <FormItem>
                        <FormLabel>What type of performer are you? *</FormLabel>
                        <FormDescription>Select all categories that apply to your performance style</FormDescription>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {categories.map((category) => (
                            <FormField
                              key={category}
                              control={form.control}
                              name="categories"
                              render={({ field }) => {
                                return (
                                  <FormItem key={category} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(category)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, category])
                                            : field.onChange(field.value?.filter((value) => value !== category))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{category}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Languages */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Languages
                  </h3>

                  <FormField
                    control={form.control}
                    name="languages"
                    render={() => (
                      <FormItem>
                        <FormLabel>Languages Spoken *</FormLabel>
                        <FormDescription>Select all languages you can perform in</FormDescription>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {languages.map((language) => (
                            <FormField
                              key={language}
                              control={form.control}
                              name="languages"
                              render={({ field }) => {
                                return (
                                  <FormItem key={language} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(language)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, language])
                                            : field.onChange(field.value?.filter((value) => value !== language))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{language}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fee Range */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Pricing
                  </h3>

                  <FormField
                    control={form.control}
                    name="feeRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Range *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your typical fee range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {feeRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>This helps event planners find artists within their budget</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Profile Image */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Profile Image
                  </h3>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground">Upload Profile Photo (Optional)</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {selectedImage ? (
                          <img
                            src={selectedImage || "/placeholder.svg"}
                            alt="Profile preview"
                            className="h-20 w-20 rounded-full object-cover border-2 border-border"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="profile-image"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("profile-image")?.click()}
                        >
                          Choose Image
                        </Button>
                        <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={saveAsDraft}
                    disabled={isSaving}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
