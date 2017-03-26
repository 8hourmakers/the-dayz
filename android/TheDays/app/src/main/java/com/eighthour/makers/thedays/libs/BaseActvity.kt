package com.eighthour.makers.thedays.libs

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.eighthour.makers.thedays.App
import com.eighthour.makers.thedays.ApplicationComponent

abstract class BaseActvity : AppCompatActivity() {

    protected val component: ApplicationComponent by lazy { (applicationContext as App).appComponent }
}