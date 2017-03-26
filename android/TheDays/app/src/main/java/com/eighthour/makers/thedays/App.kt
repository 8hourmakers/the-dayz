package com.eighthour.makers.thedays

import android.app.Application

class App : Application(){

    val appComponent: ApplicationComponent by lazy { ApplicationComponent.Initializer.init(this) }

    override fun onCreate() {
        super.onCreate()
        appComponent.inject(this)
    }

    override fun onTerminate() {
        super.onTerminate()
    }
}