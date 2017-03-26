package com.eighthour.makers.thedays

import android.app.Application
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

@Module
class ApplicationModule(private val application : Application){

    @Provides
    @Singleton
    fun provideApplication(): Application = application
}